import { useState, useEffect, useCallback } from 'react';

import {
  getSession,
  clearSession,
  saveSession,
  hasIncompleteForm,
} from '@/utils/contactFormStorage';

export interface ResumeFormData {
  email_id?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  company_name?: string;
  state?: string;
  state_code?: string;
  comments?: string;
}

interface FormStatusResponse {
  current_step: number;
  completion_status: 'incomplete' | 'completed';
  form_data: ResumeFormData;
}

interface UseResumeFormReturn {
  showDialog: boolean;
  isLoading: boolean;
  error: string | null;
  resumeData: ResumeFormData | null;
  currentStep: number;
  sessionId: string | null;
  handleContinue: () => Promise<void>;
  handleStartNew: () => void;
  closeDialog: () => void;
  fetchFormStatus: (token: string) => Promise<FormStatusResponse | null>;
}

export const useResumeForm = (): UseResumeFormReturn => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeFormData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Fetch form status from API
  const fetchFormStatus = useCallback(async (token: string): Promise<FormStatusResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/contact/status?session=${encodeURIComponent(token)}`);

      if (response.ok) {
        const data: FormStatusResponse = await response.json();
        return data;
      } else {
        const errorData = await response.json().catch(() => ({
          errors: [{ message: 'Failed to fetch form status' }],
          status_code: response.status,
        }));

        // Handle specific error codes
        if (errorData.status_code === 404 || errorData.status_code === 422) {
          // Session not found or invalid - clear localStorage
          clearSession();
          setError('Your previous session has expired. Please start a new form.');
        } else {
          setError(errorData.errors?.[0]?.message || 'Failed to fetch form status');
        }

        return null;
      }
    } catch (err) {
      setError('Network error. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check for incomplete form on mount
  useEffect(() => {
    const checkForIncompleteForm = async () => {
      // Check for resume URL parameter first
      const urlParams = new URLSearchParams(window.location.search);
      const resumeToken = urlParams.get('resume');

      if (resumeToken) {
        // User clicked email link - fetch their saved form data
        setIsLoading(true);
        const data = await fetchFormStatus(resumeToken);

        if (data) {
          saveSession(resumeToken, data.current_step);
          setSessionId(resumeToken);
          setCurrentStep(data.current_step + 1); // Move to next step
          setResumeData(data.form_data);
        }

        // Clear URL parameter from browser history
        window.history.replaceState({}, '', window.location.pathname);
        setIsLoading(false);
        return;
      }

      // Check localStorage for incomplete form
      if (hasIncompleteForm()) {
        const session = getSession();
        if (session) {
          setSessionId(session.sessionId);
          setCurrentStep(session.currentStep);
          setShowDialog(true);
        }
      }
    };

    checkForIncompleteForm();
  }, [fetchFormStatus]);

  // Handle continue - fetch form data and resume
  const handleContinue = useCallback(async () => {
    if (!sessionId) {
      setShowDialog(false);
      return;
    }

    setIsLoading(true);
    const data = await fetchFormStatus(sessionId);

    if (data) {
      setResumeData(data.form_data);
      setCurrentStep(data.current_step + 1); // Move to next step
      setShowDialog(false);
    }

    setIsLoading(false);
  }, [sessionId, fetchFormStatus]);

  // Handle start new - clear localStorage and reset
  const handleStartNew = useCallback(() => {
    clearSession();
    setSessionId(null);
    setCurrentStep(1);
    setResumeData(null);
    setShowDialog(false);
    setError(null);
  }, []);

  // Close dialog
  const closeDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  return {
    showDialog,
    isLoading,
    error,
    resumeData,
    currentStep,
    sessionId,
    handleContinue,
    handleStartNew,
    closeDialog,
    fetchFormStatus,
  };
};

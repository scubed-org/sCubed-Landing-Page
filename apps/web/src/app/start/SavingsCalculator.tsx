'use client';

import Link from 'next/link';
import React, { useId, useMemo, useState } from 'react';

import {
  calcCard,
  calcField,
  calcGrid,
  calcInput,
  calcInputPrefix,
  calcInputWrap,
  calcLabel,
  calcNote,
  calcResultLabel,
  calcResults,
  calcResultTile,
  calcResultTileHighlight,
  calcResultValue,
  calcRows,
  calcSubhead,
} from './styles.css';

/**
 * "What you pay now vs. S Cubed" calculator.
 *
 * S Cubed's prices are passed in from the server, resolved the same way the
 * /pricing page resolves them (live plans API, falling back to the static
 * pricing-page numbers). No competitor prices live here: the visitor types in
 * what they pay today.
 */

interface ToolRow {
  readonly key: string;
  readonly label: string;
}

const TOOL_ROWS: readonly ToolRow[] = [
  { key: 'pm', label: 'Practice management / EHR' },
  { key: 'billing', label: 'Billing / clearinghouse' },
  { key: 'scheduling', label: 'Scheduling' },
  { key: 'telehealth', label: 'Telehealth' },
  { key: 'messaging', label: 'Parent communication / messaging' },
  { key: 'data', label: 'Data collection' },
];

export interface SavingsCalculatorProps {
  /** Growth plan price per staff per month (billed monthly). */
  readonly perStaffMonthly: number;
  /** Telehealth add-on monthly price. */
  readonly telehealthMonthly: number;
  /** Whether the telehealth add-on is charged per staff (else flat per clinic). */
  readonly telehealthPerStaff: boolean;
}

const money = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

const toAmount = (raw: string) => {
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  perStaffMonthly,
  telehealthMonthly,
  telehealthPerStaff,
}) => {
  const idPrefix = useId();
  const [staff, setStaff] = useState('');
  const [tools, setTools] = useState<Record<string, string>>({});

  const staffCount = Math.floor(toAmount(staff));

  const { current, scubed, usesTelehealth } = useMemo(() => {
    const currentTotal = TOOL_ROWS.reduce(
      (sum, row) => sum + toAmount(tools[row.key] ?? ''),
      0,
    );
    const telehealth = toAmount(tools.telehealth ?? '') > 0;
    const telehealthCost = telehealth
      ? telehealthMonthly * (telehealthPerStaff ? staffCount : 1)
      : 0;
    return {
      current: currentTotal,
      scubed: staffCount * perStaffMonthly + telehealthCost,
      usesTelehealth: telehealth,
    };
  }, [tools, staffCount, perStaffMonthly, telehealthMonthly, telehealthPerStaff]);

  const ready = staffCount > 0 && current > 0;
  const monthlyDiff = current - scubed;
  const yearlyDiff = monthlyDiff * 12;

  const telehealthPrice = `${money(telehealthMonthly)}/${
    telehealthPerStaff ? 'staff/' : ''
  }month`;

  return (
    <div className={calcCard}>
      <div className={calcGrid}>
        <div>
          <div className={calcField}>
            <label className={calcLabel} htmlFor={`${idPrefix}-staff`}>
              How many staff use your software?
            </label>
            <div className={calcInputWrap}>
              <input
                id={`${idPrefix}-staff`}
                className={calcInput}
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                placeholder="e.g. 12"
                value={staff}
                onChange={(e) => setStaff(e.target.value)}
              />
            </div>
          </div>

          <p className={calcSubhead}>What do you pay each month for...</p>
          <div className={calcRows}>
            {TOOL_ROWS.map((row) => (
              <div className={calcField} key={row.key}>
                <label
                  className={calcLabel}
                  htmlFor={`${idPrefix}-${row.key}`}
                >
                  {row.label}
                </label>
                <div className={calcInputWrap}>
                  <span className={calcInputPrefix} aria-hidden="true">
                    $
                  </span>
                  <input
                    id={`${idPrefix}-${row.key}`}
                    className={calcInput}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    placeholder="0"
                    value={tools[row.key] ?? ''}
                    onChange={(e) =>
                      setTools((prev) => ({ ...prev, [row.key]: e.target.value }))
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={calcResults} aria-live="polite">
          <div className={calcResultTile}>
            <span className={calcResultLabel}>You pay now</span>
            <span className={calcResultValue}>{money(current)}/mo</span>
          </div>
          <div className={calcResultTile}>
            <span className={calcResultLabel}>
              S Cubed for {staffCount > 0 ? staffCount : '–'} staff
            </span>
            <span className={calcResultValue}>
              {staffCount > 0 ? `${money(scubed)}/mo` : '–'}
            </span>
          </div>
          <div className={`${calcResultTile} ${calcResultTileHighlight}`}>
            <span className={calcResultLabel}>
              {ready && monthlyDiff < 0
                ? 'Extra per year with S Cubed'
                : 'You could save per year'}
            </span>
            <span className={calcResultValue}>
              {ready ? money(Math.abs(yearlyDiff)) : '–'}
            </span>
            {ready && (
              <span className={calcResultLabel}>
                {money(Math.abs(monthlyDiff))} a month
              </span>
            )}
          </div>
          {!ready && (
            <p className={calcNote}>
              Enter your staff count and what you pay today to see the
              difference.
            </p>
          )}
        </div>
      </div>

      <p className={calcNote}>
        S Cubed&apos;s price is an estimate based on our listed Growth plan at{' '}
        {money(perStaffMonthly)} per staff per month (billed monthly), which
        includes billing and clearinghouse fees.
        {usesTelehealth
          ? ` It also includes the telehealth add-on at ${telehealthPrice}.`
          : ''}{' '}
        Annual billing costs less. See{' '}
        <Link href="/pricing">full pricing</Link>, or ask us for an exact quote
        on your call.
      </p>
    </div>
  );
};

export default SavingsCalculator;

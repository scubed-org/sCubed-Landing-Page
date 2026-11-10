import React from 'react';

import {
  sectionContainer,
  sectionTitle,
  tintedSection,
} from '../shared.css';

import {
  planBody,
  planBullet,
  planCard,
  planHeader,
  planHours,
  planList,
  planListItem,
  planName,
  planPeriod,
  planPrice,
  plansGrid,
} from './styles.css';

interface FieldworkPlan {
  name: string;
  price: string;
  inclusions: string[];
}

const plans: FieldworkPlan[] = [
  {
    name: 'STANDARD FIELDWORK',
    price: '$500',
    inclusions: [
      '2 Individual 1:1 Meetings',
      '4 Group Meetings',
      '2 Hours of Extended Supervision',
    ],
  },
  {
    name: 'CONCENTRATED FIELDWORK',
    price: '$750',
    inclusions: [
      '4 Individual 1:1 Meetings',
      '4 Group Meetings',
      '4 Hours of Extended Supervision',
    ],
  },
];

const FieldworkPlans: React.FC = () => (
  <section className={tintedSection}>
    <div className={sectionContainer}>
      <h2 className={sectionTitle}>Choose Your Fieldwork Experience</h2>
      <div className={plansGrid}>
        {plans.map((plan) => (
          <div key={plan.name} className={planCard}>
            <div className={planHeader}>
              <p className={planName}>{plan.name}</p>
              <p className={planPrice}>
                {plan.price}
                <span className={planPeriod}>/month</span>
              </p>
              <p className={planHours}>Up to 160 Hours</p>
            </div>
            <div className={planBody}>
              <ul className={planList}>
                {plan.inclusions.map((inclusion) => (
                  <li key={inclusion} className={planListItem}>
                    <span className={planBullet} aria-hidden="true" />
                    {inclusion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FieldworkPlans;

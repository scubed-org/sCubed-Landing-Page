import type { Metadata } from 'next';

import {
  body,
  bullets,
  byline,
  bylineName,
  callout,
  calloutLabel,
  capture,
  captureBody,
  captureTitle,
  closing,
  closingQuote,
  contactLink,
  eyebrow,
  h3,
  hero,
  heroInner,
  heroLede,
  heroTitle,
  main,
  page,
  part,
  partIntro,
  partLabel,
  partTitle,
  signoff,
  step,
  steps,
  stepTitle,
  table,
  tableWrap,
} from './styles.css';
import BookACall from './BookACall';

import NewsletterForm from '@/components/NewsletterForm';



export const metadata: Metadata = {
  title: 'The First 90 Days of an ABA Practice - A Field Guide | S Cubed',
  description:
    'What actually happens between deciding to open an ABA practice and seeing your first client. Real timelines, real costs, and the things nobody warns you about - from a BCBA who opened her own clinic.',
  alternates: {
    canonical: '/90days',
  },
  openGraph: {
    title: 'The First 90 Days of an ABA Practice',
    description:
      'The real order of operations, realistic credentialing timelines by payer, and what it actually costs. Written by a BCBA who did it.',
    url: '/90days',
    type: 'article',
  },
};

const payerTimelines: ReadonlyArray<readonly [string, string]> = [
  ['Medicaid', 'The slowest by far. We have been at it two years and are still not fully approved.'],
  ['Aetna', 'Six to nine months.'],
  ['Scott & White', 'Six to nine months.'],
  ['TRICARE, Magellan and BCBS', '90 days, then another 90.'],
  ['Grants and state funders', 'Sometimes considerably quicker than commercial payers.'],
];

const openingCosts: ReadonlyArray<readonly [string, string]> = [
  [
    'Clinic space',
    'Around $300,000. Security deposit, initial rent, build-out, furniture and equipment, additional insurance, camera security.',
  ],
  ['Legal, insurance, credentialing', 'Around $20,000.'],
  ['Materials, software, training, marketing', 'Around $20,000.'],
  ['First payroll', 'Around $25,000 to start, depending on staffing size.'],
];

export default function NinetyDaysPage() {
  return (
    <article className={page}>
      <header className={hero}>
        <div className={heroInner}>
          <p className={eyebrow}>A field guide from someone who has done it</p>
          <h1 className={heroTitle}>The First 90 Days of an ABA Practice</h1>
          <p className={heroLede}>
            What actually happens between deciding to open and seeing your first
            client. The real order, the real timelines, and the things nobody
            warns you about.
          </p>
          <div className={byline}>
            <span className={bylineName}>Stephanie Emmons, M.Ed, BCBA, LBA</span>
            <span>Founder, S Cubed</span>
          </div>
        </div>
      </header>

      <main className={main}>
        <section className={part}>
          <p className={body}>
            You just registered your NPI. Congratulations, and I mean that
            sincerely, because I remember exactly how that felt.
          </p>
          <p className={body}>
            I&apos;m Stephanie Emmons. I&apos;m a BCBA and I own an ABA clinic. I
            opened it myself, made most of the mistakes available to me, and
            learned the rest from people who were kind enough to tell me the
            truth.
          </p>
          <p className={body}>
            This is what I wish someone had handed me on day one. There&apos;s no
            pitch in it. If it&apos;s useful, keep it. If you get stuck on
            something in here, call me and I&apos;ll talk it through with you.
          </p>

          <div className={callout}>
            <p className={calloutLabel}>One thing before you start</p>
            <p className={body}>
              <strong>Grow slow.</strong> I cannot say this enough. The single
              most expensive mistake I see is taking on overhead faster than
              money comes in. Add staff and space only as you genuinely need
              them. Almost everything else in this guide is a version of that one
              idea.
            </p>
          </div>
        </section>

        <section className={part} id="order-of-operations">
          <p className={partLabel}>Part one</p>
          <h2 className={partTitle}>The actual order of operations</h2>
          <p className={partIntro}>
            Not the tidy version. This is the order I&apos;d give a friend.
          </p>

          <ol className={steps}>
            <li className={step}>
              <h3 className={stepTitle}>Sort your entity and your credentials</h3>
              <ul className={bullets}>
                <li>
                  Check whether your state requires a licensed professional in
                  the ownership team. If it does, you either are one or you need
                  to find one before anything else happens.
                </li>
                <li>
                  Create your LLC. Create a DBA if you need one. Choose the right
                  entity type for your situation.
                </li>
                <li>
                  Apply for your Tax ID, then your NPI. Open a business bank
                  account and get a credit card.
                </li>
              </ul>
            </li>

            <li className={step}>
              <h3 className={stepTitle}>Get an address before you need one</h3>
              <ul className={bullets}>
                <li>
                  Have a location in mind or start looking. Insurance and
                  credentialing both need an address to work from, so this blocks
                  more than you&apos;d think.
                </li>
                <li>Purchase liability and malpractice insurance.</li>
              </ul>
            </li>

            <li className={step}>
              <h3 className={stepTitle}>Start the insurance clock</h3>
              <ul className={bullets}>
                <li>Confirm your CAQH profile is current.</li>
                <li>
                  Start contracting with payers. Then start credentialing once
                  you have a contract. These are two different things and they
                  happen in that order.
                </li>
                <li>
                  This is the longest part of the whole process. Start it earlier
                  than feels necessary.
                </li>
              </ul>
            </li>

            <li className={step}>
              <h3 className={stepTitle}>Build the practice while you wait</h3>
              <ul className={bullets}>
                <li>
                  Start looking for your lead clinician. Start looking at
                  practice management systems.
                </li>
                <li>Finalize your space. Lease, build out, furniture, equipment.</li>
                <li>
                  Write your policies, handbooks and templates, and have an
                  employment attorney in your state review them.
                </li>
                <li>Start marketing locally for both staff and families.</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className={part} id="credentialing">
          <p className={partLabel}>Part two</p>
          <h2 className={partTitle}>Credentialing is the long pole</h2>
          <p className={partIntro}>
            This is the thing that will eat your first three months. Everything
            else can be worked around. This can&apos;t.
          </p>

          <h3 className={h3}>Realistic timelines by payer</h3>
          <p className={body}>
            These are what we&apos;ve actually experienced. Some go faster, some
            go slower, but plan against these rather than what you&apos;re told.
          </p>

          <div className={tableWrap}>
            <table className={table}>
              <thead>
                <tr>
                  <th scope="col">Payer</th>
                  <th scope="col">Realistic timeline</th>
                </tr>
              </thead>
              <tbody>
                {payerTimelines.map(([payer, timeline]) => (
                  <tr key={payer}>
                    <th scope="row">{payer}</th>
                    <td>{timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className={h3}>Which payer to start with</h3>
          <p className={body}>
            It depends on your state and who lives around you. Medicaid always
            takes longest, so if it matters to your population, start it first.
            We&apos;re near a military base, so TRICARE was our priority. Some
            payers aren&apos;t open for applications at all, and some won&apos;t
            let you participate until you have a certain number of staff. The
            honest answer is to pick the payer that will get you clients the
            quickest.
          </p>

          <h3 className={h3}>What actually delays an application</h3>
          <ul className={bullets}>
            <li>Incomplete applications. This is number one every time.</li>
            <li>Incorrect information. Number two every time.</li>
            <li>Items lost in transit. Or so they tell us.</li>
            <li>
              After that it comes down to pushing and calling. How much time can
              you dedicate to being genuinely annoying?
            </li>
          </ul>
        </section>

        <section className={part} id="getting-paid">
          <p className={partLabel}>Part three</p>
          <h2 className={partTitle}>Getting paid before credentialing finishes</h2>
          <p className={partIntro}>
            You do not have to sit and wait nine months with no revenue. This is
            the part most new owners don&apos;t know about.
          </p>

          <h3 className={h3}>Single case agreements</h3>
          <p className={body}>
            A single case agreement is an arrangement with one insurer to cover
            services for one specific client. Most of the time they pay at
            in-network rates. Sometimes they&apos;ll only offer out-of-network
            rates, which is less, but it still keeps the child in services.
          </p>
          <p className={body}>
            You use one while you&apos;re waiting on a contract to come through,
            or for a single client when you don&apos;t plan to contract with that
            payer otherwise, or when a family&apos;s coverage changes
            unexpectedly, or when their previous provider stops services.
          </p>
          <p className={body}>
            Payers agree because they don&apos;t like lapses in care, especially
            if their network is closed or they don&apos;t have much coverage in
            your area.
          </p>

          <h3 className={h3}>How to actually get one</h3>
          <ol className={bullets}>
            <li>Call the payer and request one. Explain why.</li>
            <li>
              Submit a formal request for services in whatever format they ask
              for.
            </li>
            <li>
              They review the documentation and typically approve within two to
              four weeks.
            </li>
          </ol>

          <div className={callout}>
            <p className={calloutLabel}>We have never been told no</p>
            <p className={body}>
              Blue Cross Blue Shield is a common one for us. Aetna has worked
              too. What makes the difference is how often you&apos;ve asked and
              why, whether their network is open, whether you&apos;ve had issues
              with that payer before, and whether they already have enough
              providers in-network to refer to instead.
            </p>
          </div>
        </section>

        <section className={part} id="costs-and-hiring">
          <p className={partLabel}>Part four</p>
          <h2 className={partTitle}>What it costs, and who to hire</h2>
          <p className={partIntro}>
            Most of this depends on whether you&apos;re opening a clinic space or
            working in homes and the community. In-home is dramatically cheaper.
          </p>

          <div className={tableWrap}>
            <table className={table}>
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Rough cost</th>
                </tr>
              </thead>
              <tbody>
                {openingCosts.map(([category, cost]) => (
                  <tr key={category}>
                    <th scope="row">{category}</th>
                    <td>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={body}>
            <strong>
              Start with no less than three months of operating costs in hand.
            </strong>
          </p>

          <h3 className={h3}>The costs nobody warns you about</h3>
          <ul className={bullets}>
            <li>
              You will not pay yourself for a long time. Unless you&apos;re the
              sole provider, expect this to take a while.
            </li>
            <li>
              If you don&apos;t have in-house billing, outsourcing it usually
              costs more than people expect.
            </li>
            <li>
              Staff want to be paid for everything, and competing with the big
              companies on pay is hard.
            </li>
          </ul>

          <h3 className={h3}>Your first hire</h3>
          <p className={body}>
            It should be a BCBA, as a Director or Supervisor. If you&apos;re not
            one yourself, you&apos;ll need one immediately for credentialing.
            Bring them in at least 30 days before opening. They need training and
            they&apos;ll become your right hand.
          </p>

          <h3 className={h3}>Before an RBT can see a client</h3>
          <p className={body}>
            This is state and payer dependent. Most require a certified RBT who
            has tested out and been approved by the BACB. Some payers let them
            work under the BCBA with nothing further. TRICARE requires
            certification of the RBTs themselves, plus malpractice insurance, a
            background check, a signing BCBA, and all of it submitted for
            approval. Budget 30 days for that.
          </p>

          <div className={callout}>
            <p className={calloutLabel}>What turnover actually costs</p>
            <p className={body}>
              An RBT costs about $1,000 to hire. Background check, test-out time,
              credentialing, insurance, training. Losing one costs about $9,000.
              You lose the $1,000 you spent, you spend another $1,000 replacing
              them, and the rest is lost service for the child while you train
              someone new. It&apos;s worse if the family gets frustrated and
              reduces or moves services.
            </p>
            <p className={body}>
              A BCBA costs $6,000 to $10,000 to hire and at least $30,000 to
              lose, more if growth stalls because you have nobody to take the
              caseload.
            </p>
          </div>
        </section>

        <section className={part} id="systems">
          <p className={partLabel}>Part five</p>
          <h2 className={partTitle}>Systems, and the audit nobody expects</h2>
          <p className={partIntro}>
            You should have a practice management system before you open your
            doors. I know that sounds like something a software company would
            say, so here&apos;s the actual reason.
          </p>

          <div className={callout}>
            <p className={calloutLabel}>New clinics are the first to get audited</p>
            <p className={body}>
              With payers cracking down, starting on pen and paper or
              disorganized is a real risk. If you fail your first audit, it
              triggers more frequent and more intense audits after that. And you
              cannot afford money taken back in your first few months.
            </p>
          </div>

          <p className={body}>
            Without documentation you cannot bill. If documentation is lost or
            incorrect, assume that money is gone. Billing cleanup is far worse
            than getting it right the first time, because you lose the revenue
            and then pay staff to sort through the mess.
          </p>
          <p className={body}>
            It&apos;s really a question of where you want to spend the money.
            Around $500 a month on a system that handles the clinic, or an extra
            $2,000 a month on a person to fix your billing. Start looking after
            your location is decided and credentialing has started.
          </p>

          <h3 className={h3}>Questions to ask any vendor</h3>
          <p className={body}>Including us. These are the ones that actually matter.</p>
          <ol className={bullets}>
            <li>Are you genuinely all in one?</li>
            <li>
              Do I need to attach anything else to make it work, or is there
              something else I&apos;ll have to pay for? Clearinghouse fees are
              the big one here.
            </li>
            <li>Are you HIPAA compliant, and how is my data secured?</li>
            <li>Can you handle specialties beyond ABA? Multiple locations?</li>
            <li>Who is my team, and who is my go-to person?</li>
          </ol>

          <h3 className={h3}>The things I wish someone had told me</h3>
          <ul className={bullets}>
            <li>
              Have a plan. When it fails, and it will, have plans B through Z.
              Being rigid is the fastest way to lose your staff&apos;s trust.
            </li>
            <li>
              Vet your leadership hires harder than you think you need to. You
              can teach skill and organization. You cannot teach passion.
            </li>
            <li>
              Be ready to be all in for three years before you take a break, a
              vacation, or a salary.
            </li>
          </ul>
        </section>

        <section className={closing}>
          <p className={closingQuote}>
            No one enters this field to make insurance payers happy. We enter it
            to make a difference for our kids and our families.
          </p>
          <p className={signoff}>
            Stephanie Emmons, M.Ed, BCBA, LBA &middot; Founder, S Cubed
          </p>
        </section>

        <section className={capture}>
          <h2 className={captureTitle}>Want the rest as it gets written?</h2>
          <p className={captureBody}>
            This guide gets updated as timelines and payer rules change. Leave
            your email and we&apos;ll send the updates. Nothing else, and you can
            stop them any time.
          </p>
          <NewsletterForm />
          <p className={captureBody} style={{ marginTop: '1.5rem', marginBottom: 0 }}>
            Stuck on something in here? Email{' '}
            <a className={contactLink} href="mailto:jace@scubed.io">
              jace@scubed.io
            </a>{' '}
            and we&apos;ll talk it through. No pitch.
          </p>
        </section>
        <BookACall variant="inline" />
      </main>

      <BookACall variant="sticky" />
    </article>
  );
}

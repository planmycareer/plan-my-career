import LegalLayout from '../components/LegalLayout'

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updatedAt="2026-01-12">
      <p>
        This Privacy Policy explains how PlanMyCareer ("we", "us", "our") collects, uses, and protects your
        information when you use our website and services.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Account information</strong> (name, email, phone if provided).</li>
        <li><strong>Assessment data</strong> (your answers, scores, and generated reports).</li>
        <li><strong>Payment metadata</strong> (transaction references, subscription status). We do not store full card details.</li>
        <li><strong>Technical data</strong> (IP address, device/browser info, basic analytics).</li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To provide access to paid features and generate reports.</li>
        <li>To improve our content, test engine, and predictor accuracy.</li>
        <li>To support users and handle requests.</li>
        <li>To comply with legal obligations and prevent fraud/abuse.</li>
      </ul>

      <h2>Sharing of information</h2>
      <p>
        We may share limited data with service providers strictly to operate the platform (hosting, analytics,
        payment processing). We do not sell your personal data.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain account and assessment data for as long as needed to provide services and meet legal requirements.
        You may request deletion of your account, subject to legal and billing record obligations.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organizational security measures. No method of transmission or storage is
        100% secure; therefore, we cannot guarantee absolute security.
      </p>

      <h2>Your rights</h2>
      <ul>
        <li>Access, update, or correct your information.</li>
        <li>Request account deletion (where applicable).</li>
        <li>Withdraw consent where processing is based on consent.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        For privacy questions, contact: <strong>planmycareer1@gmail.com</strong>
      </p>
    </LegalLayout>
  )
}

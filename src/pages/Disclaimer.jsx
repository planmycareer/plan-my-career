import LegalLayout from '../components/LegalLayout'

export default function Disclaimer() {
  return (
    <LegalLayout title="Disclaimer" updatedAt="2026-01-12">
      <p>
        PlanMyCareer provides educational guidance content, career assessment reports, and college prediction tools.
        The information provided is for general guidance purposes only.
      </p>

      <h2>Career assessment</h2>
      <p>
        Results and recommendations are indicative and depend on the accuracy of user inputs and responses.
        They should not be treated as professional medical, psychological, or legal advice.
      </p>

      <h2>College predictor</h2>
      <p>
  The predictor is based on historical counselling/cutoff data (currently JoSAA Round 1–5) and is meant for guidance only.
        Actual cutoffs may vary based on seat matrix, counselling rules, category, preferences, and real-time demand.
      </p>

      <h2>No guarantees</h2>
      <p>
        We do not guarantee admission, rank improvements, or outcomes.
      </p>

      <h2>Use at your own risk</h2>
      <p>
        You are responsible for your decisions and actions based on the platform outputs.
      </p>
    </LegalLayout>
  )
}

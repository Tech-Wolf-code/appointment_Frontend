export default function ProgressBar({ step, labels }) {
  const steps = labels || ["Basic Details", "Appointment", "Review"];

  return (
    <div className="flex items-center justify-between w-full pb-4">
      {steps.map((label, index) => {
        const active = step === index + 1;
        const completed = step > index + 1;

        return (
          <div key={index} className="flex items-center w-full">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full
                ${completed ? "bg-green-500" : active ? "bg-blue-600" : "bg-white/10 border border-white/20"}
                text-white font-semibold shadow-lg`}
            >
              {index + 1}
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-1 w-full mx-2 rounded-full
                ${completed ? "bg-green-500" : "bg-white/20"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

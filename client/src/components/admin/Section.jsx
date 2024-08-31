export default function Section({ title, color, value }) {
  return (
    <div
      className={`${
        color || `bg-blue-500`
      } text-white p-4 rounded-lg shadow-md`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  );
}

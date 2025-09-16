interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="bg-red-600 text-white p-4 rounded-lg m-4">
      ❌ {message}
    </div>
  );
}

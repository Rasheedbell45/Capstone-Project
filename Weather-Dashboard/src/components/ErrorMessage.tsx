interface Props {
message: string;
}

export default function ErrorMessage({ message }: Props) {
return (
<div className="bg-red-500 text-white text-center p-4 rounded-lg mt-4">
⚠️ {message}
</div>
);
}

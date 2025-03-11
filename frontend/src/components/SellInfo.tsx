interface Props {
  info: string;
  value: string;
}

const SellInfo = ({ info, value }: Props) => {
  return (
    <div className="bg-gray-100 rounded-lg px-4 py-2">
      <p className="text-center font-bold text-xl text-blue-500">{value}</p>
      <p className="text-center text-gray-500 text-sm">{info}</p>
    </div>
  );
};

export default SellInfo;

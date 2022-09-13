import { useTranslation } from 'react-i18next';

const FormInput = (type, key) => {
  const { t } = useTranslation();
  return (
    <label className="block">
      <span className="text-gray-700">{t(key)}</span>
      <input
        type={type}
        className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
      />
    </label>
  );
};

export default FormInput;

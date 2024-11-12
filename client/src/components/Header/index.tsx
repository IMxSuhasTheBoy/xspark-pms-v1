type Props = {
  name: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonComponent?: any;
  isSmallText?: boolean;
};

const Header = ({
  name,
  description,
  buttonComponent,
  isSmallText = false,
}: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between gap-4">
      <div className="flex flex-col">
        <h1
          className={`${isSmallText ? "text-lg" : "text-2xl"} text-xl font-semibold dark:text-white sm:text-2xl`}
        >
          {name}
        </h1>

        {description && (
          <p
            className={`${isSmallText ? "text-sm" : "text-lg"} text-base text-gray-400 dark:text-neutral-500 sm:text-xl`}
          >
            {description}
          </p>
        )}
      </div>

      {buttonComponent}
    </div>
  );
};

export default Header;

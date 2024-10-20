import { ThemeSwitcher } from "@/features/theme-switcher";

export const Header = () => {
  return (
    <header className="p-2 h-[90px] container">
      <div className=" bg-secondary h-full w-full rounded-md py-4 px-8 flex items-center justify-between">
        <h1 className="text-2xl text-accent font-bold">Apricode</h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

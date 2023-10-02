export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black">
      <div className="grid place-items-center sm:min-h-screen sm:py-0 py-8">
        <div className="flex flex-col">
          <h2 className="sm:text-3xl font-medium text-lg text-center pb-8">
            👋 Welcome, {"let's get started"}
          </h2>
          <div className="w-full bg-zinc-900 light:bg-white sm:min-w-[400px] min-w-[300px] max-w-sm p-8 border dark:border-zinc-800 border-zinc-200 rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

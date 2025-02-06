export default function CreateRecipes() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-10">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
          <div className="sm:px-6 lg:px-0">
            <div className="relative isolate overflow-hidden bg-[#F9F4F2] px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] opacity-20 ring-1 ring-inset ring-white"
              />
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <img
                  alt="Product screenshot"
                  src="/feature-img.svg"
                  width={2432}
                  height={1442}
                  className="-mb-12 w-[57rem] max-w-none rounded-tl-xl ring-1 ring-white/10"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
              />
            </div>
          </div>
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg flex flex-col">
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Create your own
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Create your own recipes with an easy to use recipe editor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

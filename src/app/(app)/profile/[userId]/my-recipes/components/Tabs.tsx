'use client';

import CreateRecipeButton from './CreateRecipeButton';

export default function Tabs({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { name: string; key: string }[];
  activeTab: string;
  setActiveTab: (key: string) => void;
}) {
  return (
    <nav className="flex justify-between items-center pb-4">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 rounded-md text-sm font-semibold ${
              activeTab === tab.key
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div>
        <CreateRecipeButton />
      </div>
    </nav>
  );
}

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
    <nav className="flex space-x-4 justify-between">
      <div>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 rounded-md text-sm font-semibold ${
              activeTab === tab.key
                ? 'bg-green-100 text-green-700'
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

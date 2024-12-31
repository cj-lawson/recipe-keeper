'use client';

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
    <nav className="flex space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            activeTab === tab.key
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  );
}

import React, { Dispatch, SetStateAction } from 'react';
import { Home, FileAudio, History, Settings as SettingsIcon, HelpCircle } from 'lucide-react';

type View = 'dashboard' | 'transcribe' | 'history' | 'settings' | 'help';

interface SidebarProps {
  activeView: View;
  setActiveView: Dispatch<SetStateAction<View>>;
}

const mainMenuItems = [
  { icon: FileAudio, label: 'Transcribe', view: 'transcribe' as View },
  { icon: History, label: 'History', view: 'history' as View },
  { icon: Home, label: 'Dashboard', view: 'dashboard' as View },
];

const bottomMenuItems = [
  { icon: SettingsIcon, label: 'Settings', view: 'settings' as View },
  { icon: HelpCircle, label: 'Help', view: 'help' as View },
];

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <aside className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex-1">
        <div className="mb-8">
          <img 
            src="juicerbanner-wide.png" 
            alt="Juicer Logo" 
            className="w-full h-auto"
          />
        </div>

        <nav className="space-y-2">
          {mainMenuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                ${activeView === item.view
                  ? 'bg-[#F96C57]/20 text-white' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                }
                transition-colors
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-2 border-t border-white/10 mt-auto">
        <div className="grid grid-cols-2 gap-2">
          {bottomMenuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`
                flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                ${activeView === item.view
                  ? 'bg-[#F96C57]/20 text-white' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                }
                transition-colors
              `}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
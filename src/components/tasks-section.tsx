'use client'

import { useState } from 'react'
import { getTelegramWebApp } from '@/lib/telegram'
import { useLanguage } from './app-provider'
import { translations } from '@/lib/translations'
import { ExternalLink, Send, Share2, Users } from 'lucide-react'

export function TasksSection() {
  const tg = getTelegramWebApp()
  const { language } = useLanguage()
  const lang: 'en' | 'ru' = language === 'ru' ? 'ru' : 'en'
  const t = translations[lang].tasks
  
  const handleChannelClick = (url: string) => {
    if (tg && typeof (window as any).Telegram?.WebApp?.openLink === 'function') {
      (window as any).Telegram.WebApp.openLink(url)
    } else {
      window.open(url, '_blank')
    }
  }
  
  const handleShareStory = () => {
    if (tg && typeof (window as any).Telegram?.WebApp?.openLink === 'function') {
      (window as any).Telegram.WebApp.openLink('https://t.me/share/url?url=Check%20out%20this%20awesome%20Gift%20Catalog!%20https://t.me/Gift_Catalog')
    } else {
      window.open('https://t.me/share/url?url=Check%20out%20this%20awesome%20Gift%20Catalog!%20https://t.me/Gift_Catalog', '_blank')
    }
  }

  return (
    <div className="w-full px-0 py-2 animate-fade-in">
      <h1 className="text-lg font-bold mb-2 text-center">{t.title}</h1>
      
      {/* Subscribe Channels Block */}
      <div className="mb-2 bg-[#1a1a1a] rounded-xl p-3 shadow-lg w-full">
        <h2 className="text-base font-semibold mb-2 text-white px-1">{t.subscribeChannels}</h2>
        <div className="space-y-1">
          <ChannelTask 
            name="Subscribe Palace" 
            points={100} 
            url="https://t.me/Palace"
            status="done"
          />
          <ChannelTask 
            name="Subscribe Крипту На Мыло" 
            points={100} 
            url="https://t.me/cryptomail"
            status="done"
          />
          <ChannelTask 
            name="Subscribe Limited Stickers" 
            points={100} 
            url="https://t.me/LimitedStickers"
            status="done"
          />
          <ChannelTask 
            name="Subscribe Агент Дурова" 
            points={100} 
            url="https://t.me/durovagent"
            status="start"
          />
        </div>
      </div>
      
      {/* Invite Friends Block */}
      <div className="mb-2 bg-[#1a1a1a] rounded-xl p-3 shadow-lg w-full">
        <h2 className="text-base font-semibold mb-2 text-white px-1">{t.inviteFriends}</h2>
        <div className="space-y-1">
          <ReferralTask 
            description="Invite 3 friends" 
            points={50} 
            status="done"
          />
          <ReferralTask 
            description="Invite 5 friends" 
            points={100} 
            status="done"
          />
          <ReferralTask 
            description="Invite 10 friends" 
            points={150} 
            status="done"
          />
          <ReferralTask 
            description="Invite 25 friends" 
            points={300} 
            status="done"
          />
          <ReferralTask 
            description="Invite 50 friends" 
            points={500} 
            status="done"
          />
        </div>
      </div>
      
      {/* Share Stories Block */}
      <div className="bg-[#1a1a1a] rounded-xl p-3 shadow-lg w-full">
        <h2 className="text-base font-semibold mb-2 text-white px-1">{t.shareStories}</h2>
        <div className="space-y-1">
          <StoryTask 
            description="Share story" 
            points={30} 
            onShare={handleShareStory}
            status="start"
          />
        </div>
      </div>
    </div>
  )
}

interface TaskProps {
  points: number
  status: 'start' | 'done'
}

interface ChannelTaskProps extends TaskProps {
  name: string
  url: string
}

function ChannelTask({ name, points, url, status }: ChannelTaskProps) {
  const tg = getTelegramWebApp()
  const { language } = useLanguage()
  const lang: 'en' | 'ru' = language === 'ru' ? 'ru' : 'en'
  const t = translations[lang].tasks
  
  const handleClick = () => {
    if (status === 'start' && tg && typeof (window as any).Telegram?.WebApp?.openLink === 'function') {
      (window as any).Telegram.WebApp.openLink(url)
    } else if (status === 'start') {
      window.open(url, '_blank')
    }
  }
  
  return (
    <div className="flex items-center justify-between py-0.5 px-1">
      <div className="flex items-center flex-1">
        <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-2">
          <ExternalLink className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-sm text-white leading-tight">{name}</p>
          <div className="flex items-center">
            <span className="text-purple-400 mr-1 text-xs">💎</span>
            <span className="text-xs text-purple-400">+{points} points</span>
          </div>
        </div>
      </div>
      <button 
        className={`px-4 py-1 rounded-full text-xs font-medium min-w-[80px] ${
          status === 'done' 
            ? 'bg-[#333333] text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:from-purple-600 hover:to-indigo-600'
        }`}
        disabled={status === 'done'}
        onClick={handleClick}
      >
        {status === 'done' ? t.done : t.start}
      </button>
    </div>
  )
}

interface ReferralTaskProps extends TaskProps {
  description: string
}

function ReferralTask({ description, points, status }: ReferralTaskProps) {
  const { language } = useLanguage()
  const lang: 'en' | 'ru' = language === 'ru' ? 'ru' : 'en'
  const t = translations[lang].tasks
  
  return (
    <div className="flex items-center justify-between py-0.5 px-1">
      <div className="flex items-center flex-1">
        <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-2">
          <Users className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-sm text-white leading-tight">{description}</p>
          <div className="flex items-center">
            <span className="text-purple-400 mr-1 text-xs">💎</span>
            <span className="text-xs text-purple-400">+{points} points</span>
          </div>
        </div>
      </div>
      <div 
        className={`px-4 py-1 rounded-full text-xs font-medium min-w-[80px] text-center ${
          status === 'done' 
            ? 'bg-[#333333] text-gray-400' 
            : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:from-purple-600 hover:to-indigo-600'
        }`}
      >
        {t.done}
      </div>
    </div>
  )
}

interface StoryTaskProps extends TaskProps {
  description: string
  onShare: () => void
}

function StoryTask({ description, points, onShare, status }: StoryTaskProps) {
  const { language } = useLanguage()
  const lang: 'en' | 'ru' = language === 'ru' ? 'ru' : 'en'
  const t = translations[lang].tasks
  
  return (
    <div className="flex items-center justify-between py-0.5 px-1">
      <div className="flex items-center flex-1">
        <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-2">
          <Share2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-sm text-white leading-tight">{description}</p>
          <div className="flex items-center">
            <span className="text-purple-400 mr-1 text-xs">💎</span>
            <span className="text-xs text-purple-400">+{points} points</span>
          </div>
        </div>
      </div>
      <button 
        className={`px-4 py-1 rounded-full text-xs font-medium min-w-[80px] ${
          status === 'done' 
            ? 'bg-[#333333] text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:from-purple-600 hover:to-indigo-600'
        }`}
        disabled={status === 'done'}
        onClick={onShare}
      >
        {status === 'done' ? t.done : t.start}
      </button>
    </div>
  )
} 
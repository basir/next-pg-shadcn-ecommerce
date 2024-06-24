'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ToggleGroup type="single" value={theme}>
      <ToggleGroupItem
        value="dark"
        aria-label="Toggle dark "
        onClick={() => setTheme('dark')}
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="light"
        aria-label="Toggle light"
        onClick={() => setTheme('light')}
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="system"
        aria-label="Toggle system"
        onClick={() => setTheme('system')}
      >
        <SunMoon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

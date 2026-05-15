import { useState, useEffect } from 'react';
import { DarkSplashScreen } from './components/DarkSplashScreen';
import { DarkLoginScreen } from './components/DarkLoginScreen';
import { DarkCreateAccountScreen } from './components/DarkCreateAccountScreen';
import { DarkOnboardingScreen } from './components/DarkOnboardingScreen';
import { DarkHomeScreen } from './components/DarkHomeScreen';
import { DarkAddTaskScreen } from './components/DarkAddTaskScreen';
import { DarkResultsScreen } from './components/DarkResultsScreen';
import { DarkScheduleScreen } from './components/DarkScheduleScreen';
import { DarkProfileScreen } from './components/DarkProfileScreen';
import { DarkRescueModeScreen } from './components/DarkRescueModeScreen';
import { DarkGardenScreen } from './components/DarkGardenScreen'
import { DarkEstimateTimeScreen } from './components/DarkEstimateTimeScreen'
import { DarkGeneratingPlanScreen } from './components/DarkGeneratingPlanScreen'
import { AvatarSelectScreen } from './components/AvatarSelectScreen'
import { AppearanceScreen } from './components/AppearanceScreen'
import { NotificationsScreen } from './components/NotificationsScreen'
import { AccountSecurityScreen } from './components/AccountSecurityScreen'
import { HelpFeedbackScreen } from './components/HelpFeedbackScreen'
import { AboutRootedScreen } from './components/AboutRootedScreen'

type Screen = 'splash' | 'login' | 'signup' | 'onboarding' | 'home' | 'add' | 'estimate' | 'results' | 'schedule' | 'profile' | 'rescue' | 'garden' | 'generating' | 'avatar-select' | 'appearance' | 'notifications' | 'account'| 'help'| 'about'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [username, setUsername] = useState(() => {
  return localStorage.getItem('stepwiseUsername') || 'User'
})
  const [avatarId, setAvatarId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [accentColor, setAccentColor] = useState('var(--accent-color)');

  // Load from localStorage on mount
  useEffect(() => {
    const savedAvatarId = localStorage.getItem('stepwiseAvatarId')
    const savedUploadedImage = localStorage.getItem('stepwiseUploadedImage')
    const savedTheme = localStorage.getItem('stepwiseTheme') as 'light' | 'dark' | 'system' | null
    const savedAccentColor = localStorage.getItem('stepwiseAccentColor')

    if (savedAvatarId) setAvatarId(savedAvatarId)
    if (savedUploadedImage) setUploadedImage(savedUploadedImage)
    if (savedTheme) setTheme(savedTheme)
    if (savedAccentColor) setAccentColor(savedAccentColor)
  }, [])

  const handleAvatarChange = (newAvatarId: string | null, newUploadedImage: string | null) => {
    setAvatarId(newAvatarId)
    setUploadedImage(newUploadedImage)
    
    if (newAvatarId) {
      localStorage.setItem('stepwiseAvatarId', newAvatarId)
      localStorage.removeItem('stepwiseUploadedImage')
    } else if (newUploadedImage) {
      localStorage.setItem('stepwiseUploadedImage', newUploadedImage)
      localStorage.removeItem('stepwiseAvatarId')
    }
  }

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    localStorage.setItem('stepwiseTheme', newTheme)
  }

  const handleAccentColorChange = (newColor: string) => {
    setAccentColor(newColor)
    localStorage.setItem('stepwiseAccentColor', newColor)
  }

  const getCSSVariables = () => {
  const isLight = theme === 'light'

  return {
    '--accent-color': accentColor,

    '--bg-primary': isLight ? '#F7F8FA' : '#0D0F14',
    '--bg-secondary': isLight ? '#FFFFFF' : '#161920',

    '--text-primary': isLight ? '#111827' : '#F0F2F5',
    '--text-secondary': isLight ? '#6B7280' : '#A0A5B0',

    '--border-color': isLight ? '#E5E7EB' : '#242830',

    '--card-bg': isLight ? '#FFFFFF' : '#161920',

    '--nav-bg': isLight
      ? 'rgba(255,255,255,0.92)'
      : 'rgba(22,25,32,0.96)',
  } as React.CSSProperties
}

  const handleContinueToEstimate = () => {
    setScreen('estimate')
  }

  const handleGeneratePlanFromEstimate = () => {
    setScreen('generating')
  }

  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => {
        setScreen('login');
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleLogin = () => {
    setScreen('home');
  };

  const handleSignUp = () => {
    setScreen('signup');
  };

  const handleBackToLogin = () => {
    setScreen('login');
  };

  const handleCreateAccount = () => {
    setScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setScreen('home');
  };

  const handleNavigate = (newScreen: string) => {
    setScreen(newScreen as Screen);
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setScreen('results');
  };

  const handleStartOver = () => {
    setScreen('add');
  };

  const handleAcceptRescuePlan = () => {
    setScreen('home');
  };

  return (
    <div
      className="size-full flex items-center justify-center"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        ...getCSSVariables(),
      }}
      data-theme={theme}
      data-accent={accentColor}
    >
      {screen === 'splash' && <DarkSplashScreen />}
      {screen === 'login' && <DarkLoginScreen onLogin={handleLogin} onSignUp={handleSignUp} />}
      {screen === 'signup' && (
        <DarkCreateAccountScreen
          onCreateAccount={handleCreateAccount}
          onBackToLogin={handleBackToLogin}
        />
      )}
      {screen === 'onboarding' && <DarkOnboardingScreen onComplete={handleOnboardingComplete} />}
      {screen === 'home' && (
        <DarkHomeScreen
          onNavigate={handleNavigate}
          onTaskClick={handleTaskClick}
          username={username}
          avatarId={avatarId}
          uploadedImage={uploadedImage}
          accentColor={accentColor}
        />
      )}
      {screen === 'add' && (
        <DarkAddTaskScreen onContinue={handleContinueToEstimate} onNavigate={handleNavigate} />
      )}
      {screen === 'estimate' && (
        <DarkEstimateTimeScreen
          onBack={() => setScreen('add')}
          onGeneratePlan={handleGeneratePlanFromEstimate}
          onNavigate={handleNavigate}
        />
      )}
      {screen === 'generating' && (
        <DarkGeneratingPlanScreen
          onBack={() => setScreen('estimate')}
          onDone={() => setScreen('results')}
        />
      )}
      {screen === 'results' && (
        <DarkResultsScreen onStartOver={handleStartOver} onNavigate={handleNavigate} />
      )}
      {screen === 'schedule' && <DarkScheduleScreen onNavigate={handleNavigate} />}
      {screen === 'profile' && (
        <DarkProfileScreen
          onNavigate={handleNavigate}
          username={username}
          onUsernameChange={setUsername}
          avatarId={avatarId}
          uploadedImage={uploadedImage}
          onAvatarChange={handleAvatarChange}
        />
      )}
      {screen === 'avatar-select' && (
        <AvatarSelectScreen
          onNavigate={handleNavigate}
          onSelectAvatar={(id) => handleAvatarChange(id, null)}
          username={username}
        />
      )}
      {screen === 'appearance' && (
        <AppearanceScreen
          onNavigate={handleNavigate}
          currentTheme={theme}
          currentAccentColor={accentColor}
          onThemeChange={handleThemeChange}
          onAccentColorChange={handleAccentColorChange}
        />
      )}
      {screen === 'notifications' && (
        <NotificationsScreen onNavigate={handleNavigate} />
      )}
      {screen === 'account' && (
        <AccountSecurityScreen onNavigate={handleNavigate} />
      )}
      {screen === 'rescue' && (
        <DarkRescueModeScreen onNavigate={handleNavigate} onAcceptPlan={handleAcceptRescuePlan} />
      )}
      {screen === 'help' && (
        <HelpFeedbackScreen onNavigate={handleNavigate} />
      )}
      {screen === 'about' && (
        <AboutRootedScreen onNavigate={handleNavigate} />
      )}
      {screen === 'garden' && <DarkGardenScreen onNavigate={handleNavigate} />}
      
    </div>
  );
}
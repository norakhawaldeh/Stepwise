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

type Screen = 'splash' | 'login' | 'signup' | 'onboarding' | 'home' | 'add' | 'results' | 'schedule' | 'profile' | 'rescue';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Auto-transition from splash to login after 2 seconds
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

  const handleBuildPlan = () => {
    setScreen('results');
  };

  const handleStartOver = () => {
    setScreen('add');
  };

  const handleAcceptRescuePlan = () => {
    setScreen('home');
  };

  return (
    <div className="size-full flex items-center justify-center" style={{ backgroundColor: '#0D0F14' }}>
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
        <DarkHomeScreen onNavigate={handleNavigate} onTaskClick={handleTaskClick} />
      )}
      {screen === 'add' && (
        <DarkAddTaskScreen onBuildPlan={handleBuildPlan} onNavigate={handleNavigate} />
      )}
      {screen === 'results' && (
        <DarkResultsScreen onStartOver={handleStartOver} onNavigate={handleNavigate} />
      )}
      {screen === 'schedule' && <DarkScheduleScreen onNavigate={handleNavigate} />}
      {screen === 'profile' && <DarkProfileScreen onNavigate={handleNavigate} />}
      {screen === 'rescue' && (
        <DarkRescueModeScreen onNavigate={handleNavigate} onAcceptPlan={handleAcceptRescuePlan} />
      )}
    </div>
  );
}
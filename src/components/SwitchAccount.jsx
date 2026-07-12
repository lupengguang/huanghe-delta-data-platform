import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[500px] h-[500px]">
          <svg className="w-full h-full" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
            <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
            <circle cx="250" cy="250" r="120" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
            <circle cx="250" cy="250" r="80" fill="none" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1" />
            
            <line x1="50" y1="250" x2="450" y2="250" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
            <line x1="250" y1="50" x2="250" y2="450" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
            
            <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="2" strokeDasharray="10 5">
              <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="250" r="150" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" strokeDasharray="10 5">
              <animateTransform attributeName="transform" type="rotate" from="360 250 250" to="0 250 250" dur="15s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full">
          <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-50"></div>
          <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-25" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
}

function AccountCard({ name, role, isSelected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full p-4 rounded-lg border transition-all duration-300 text-left group ${
        isSelected
          ? 'bg-blue-600/30 border-blue-500/50 shadow-lg shadow-blue-500/20'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isSelected ? 'bg-blue-500/30 scale-110' : 'bg-white/10 group-hover:scale-105'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isSelected ? 'text-blue-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <div className={`font-medium ${isSelected ? 'text-blue-300' : 'text-white'}`}>{name}</div>
          <div className="text-gray-500 text-xs">{role}</div>
        </div>
        {isSelected && (
          <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-400 text-sm mb-2">请输入账号</label>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入账号"
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">请输入密码</label>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-600 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
          />
          <span>记住密码</span>
        </label>
        <button type="button" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
          忘记密码
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading || !username || !password}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            切换账号中...
          </>
        ) : (
          '切换账号'
        )}
      </button>

      <div className="text-center">
        <span className="text-gray-500 text-sm">没有账号？</span>
        <button type="button" className="text-blue-400 text-sm hover:text-blue-300 transition-colors ml-1">
          立即注册
        </button>
      </div>
    </form>
  );
}

function SwitchAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('switch');
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accounts = [
    { id: 1, name: 'M&G 王宗波', role: '管理员' },
    { id: 2, name: '全栈 陆鹏光', role: '管理员' },
    { id: 3, name: '全栈 陆鹏光', role: '管理员' },
    { id: 4, name: '销售 赵文婷', role: '管理员' },
  ];

  const handleSwitchAccount = () => {
    navigate('/admin');
  };

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <GridBackground />
      
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group z-50"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回后台管理
        </button>

        <AnimatedSection className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              欢迎登陆黄河三角洲后端管理页
            </h1>
            <p className="text-gray-500 text-sm">
              Welcome to the Yellow River Delta Backend Management Page
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-30 animate-pulse"></div>
            
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>
              
              <div className="absolute top-3 left-3 flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex border-b border-white/10 mt-8">
                <button
                  onClick={() => setActiveTab('switch')}
                  className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${
                    activeTab === 'switch'
                      ? 'text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  切换账号
                </button>
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${
                    activeTab === 'login'
                      ? 'text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  系统管理中心
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'switch' ? (
                  <div className="space-y-4">
                    {accounts.map((account) => (
                      <AccountCard
                        key={account.id}
                        name={account.name}
                        role={account.role}
                        isSelected={selectedAccount === account.id}
                        onClick={() => setSelectedAccount(account.id)}
                      />
                    ))}
                    
                    <button
                      onClick={handleSwitchAccount}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30"
                    >
                      切换账号
                    </button>

                    <div className="text-center">
                      <span className="text-gray-500 text-sm">没有账号？</span>
                      <button type="button" className="text-blue-400 text-sm hover:text-blue-300 transition-colors ml-1">
                        立即注册
                      </button>
                    </div>
                  </div>
                ) : (
                  <LoginForm />
                )}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600"></div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

export default SwitchAccount;
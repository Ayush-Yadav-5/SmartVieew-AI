import React from 'react';
import { Shield, Building2, User, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onSelectUserType: (userType: 'admin' | 'citizen') => void;
}

export function LandingPage({ onSelectUserType }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#060A14] relative overflow-hidden" style={{ perspective: '1000px' }}>
      {/* 3D Background Layers */}
      <div className="absolute inset-0">
        {/* Base Image Layer */}
        <div className="absolute inset-0 transform-gpu" style={{ transform: 'translateZ(-100px) scale(1.1)' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759933633339-2382db138c2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMGNpdHklMjBzZWN1cml0eSUyMHN1cnZlaWxsYW5jZXxlbnwxfHx8fDE3NjE2MjY3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Night city surveillance"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        {/* Gradient Overlay with Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060A14]/98 via-[#0C1428]/95 to-[#060A14]"></div>
        
        {/* Animated 3D Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 92, 246, 0.12) 1px, transparent 1px),
            linear-gradient(rgba(139, 92, 246, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg) scale(2)',
          transformOrigin: 'center bottom'
        }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)'
              }}
            />
          ))}
        </div>
        
        {/* Animated Gradient Waves */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-indigo-500/5 to-amber-500/5 animate-pulse"></div>
      </div>

      {/* Floating Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(99, 102, 241, 0.15); }
          50% { box-shadow: 0 0 35px rgba(139, 92, 246, 0.5), 0 0 70px rgba(99, 102, 241, 0.25); }
        }
        
        @keyframes card-float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-10px) rotateX(2deg); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo and Title with 3D Effect */}
        <div className="text-center mb-12 transform-gpu" style={{ 
          animation: 'card-float 6s ease-in-out infinite',
          transformStyle: 'preserve-3d'
        }}>
          <div className="flex items-center justify-center mb-6">
            {/* 3D Shield Icon with Layers */}
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              {/* Shadow Layer */}
              <div className="absolute inset-0 p-6 bg-violet-500/10 rounded-3xl blur-2xl" style={{ transform: 'translateZ(-20px)' }}></div>

              {/* Main Icon Container */}
              <div
                className="relative p-6 bg-gradient-to-br from-violet-500/20 to-indigo-600/20 rounded-3xl backdrop-blur-sm border border-violet-400/30 shadow-2xl"
                style={{
                  transform: 'translateZ(20px)',
                  boxShadow: `
                    0 20px 40px rgba(139, 92, 246, 0.35),
                    0 10px 20px rgba(99, 102, 241, 0.2),
                    inset 0 1px 2px rgba(255, 255, 255, 0.1)
                  `,
                  animation: 'glow-pulse 3s ease-in-out infinite'
                }}
              >
                <Shield className="w-20 h-20 text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]" />

                {/* Floating Sparkles */}
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-pulse" />
                <Zap className="absolute -bottom-1 -left-1 w-5 h-5 text-indigo-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
          
          {/* Title with 3D Text Effect */}
          <h1 
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent tracking-tight"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))',
              textShadow: '0 0 20px rgba(139, 92, 246, 0.25)'
            }}
          >
            SmartVieew AI
          </h1>

          <p className="text-xl text-gray-300 mb-2 drop-shadow-lg">
            Autonomous Urban Intelligence Platform
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From detection to decision: building the intelligence layer for future cities.
          </p>
        </div>

        {/* User Type Selection Cards with 3D */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* Admin/Organization Card - 3D Enhanced */}
          <button
            onClick={() => onSelectUserType('admin')}
            className="relative bg-gradient-to-br from-gray-900/50 to-[#0C1428]/60 backdrop-blur-lg border border-rose-500/20 rounded-2xl p-8 transition-all duration-500 group cursor-pointer text-center w-full transform-gpu hover:scale-105"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 10px 30px rgba(244, 63, 94, 0.1),
                inset 0 1px 2px rgba(255, 255, 255, 0.05)
              `
            }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              e.currentTarget.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.05) translateZ(20px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px)';
            }}
          >
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-pink-500/0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" style={{ transform: 'translateZ(-10px)' }}></div>

            <div className="flex flex-col items-center relative" style={{ transform: 'translateZ(10px)' }}>
              {/* 3D Icon Container */}
              <div
                className="p-6 bg-gradient-to-br from-rose-500/20 to-pink-600/20 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 relative"
                style={{
                  transform: 'translateZ(30px)',
                  boxShadow: `
                    0 15px 35px rgba(244, 63, 94, 0.3),
                    0 5px 15px rgba(236, 72, 153, 0.2),
                    inset 0 1px 2px rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                <Building2 className="w-16 h-16 text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />

                {/* Orbiting Dots */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-rose-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                Organization
              </h2>
              <p className="text-gray-400 mb-6">
                For government agencies, law enforcement, and authorized organizations 
                to access comprehensive crime data and management tools.
              </p>
              <ul className="text-left space-y-2 mb-8 text-gray-300 mx-auto max-w-sm">
                <li className="flex items-start gap-2 transform hover:translate-x-2 transition-transform">
                  <Shield className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Full dashboard access with analytics</span>
                </li>
                <li className="flex items-start gap-2 transform hover:translate-x-2 transition-transform">
                  <Shield className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Real-time CCTV monitoring</span>
                </li>
                <li className="flex items-start gap-2 transform hover:translate-x-2 transition-transform">
                  <Shield className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Crime hotspot mapping</span>
                </li>
                <li className="flex items-start gap-2 transform hover:translate-x-2 transition-transform">
                  <Shield className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Evidence management system</span>
                </li>
              </ul>
              <div 
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 group-hover:from-rose-600 group-hover:to-pink-700 text-white rounded-md px-4 py-2 flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  boxShadow: '0 10px 25px rgba(244, 63, 94, 0.35), 0 5px 10px rgba(236, 72, 153, 0.2)',
                  transform: 'translateZ(20px)'
                }}
              >
                <span>Continue as Organization</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Citizen/Individual Card - 3D Enhanced */}
          <button
            onClick={() => onSelectUserType('citizen')}
            className="relative bg-gradient-to-br from-gray-900/50 to-[#0C1428]/60 backdrop-blur-lg border border-violet-500/20 rounded-2xl p-8 transition-all duration-500 group cursor-pointer text-center w-full transform-gpu hover:scale-105"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 10px 30px rgba(139, 92, 246, 0.1),
                inset 0 1px 2px rgba(255, 255, 255, 0.05)
              `
            }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              e.currentTarget.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.05) translateZ(20px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px)';
            }}
          >
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-indigo-600/0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" style={{ transform: 'translateZ(-10px)' }}></div>

            <div className="flex flex-col items-center relative" style={{ transform: 'translateZ(10px)' }}>
              {/* 3D Icon Container */}
              <div
                className="p-6 bg-gradient-to-br from-violet-500/20 to-indigo-600/20 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 relative"
                style={{
                  transform: 'translateZ(30px)',
                  boxShadow: `
                    0 15px 35px rgba(139, 92, 246, 0.3),
                    0 5px 15px rgba(99, 102, 241, 0.2),
                    inset 0 1px 2px rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                <User className="w-16 h-16 text-violet-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]" />

                {/* Orbiting Dots */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-violet-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                Citizen
              </h2>
              <p className="text-gray-400 mb-6">
                For individual citizens to report incidents, view safety information, 
                and stay informed about crime trends in their area.
              </p>
              <ul className="text-left space-y-2 mb-8 text-gray-300 mx-auto max-w-sm">
                <li className="flex items-start gap-2 transform hover:translate-x-2 transition-transform">
                  <Shield className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>View crime statistics and alerts</span>
                </li>
                <li className="flex items-start gap-2 transform hover:translate-x-2 transition-transform">
                  <Shield className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>Report suspicious activities</span>
                </li>
                <li className="flex items-start gap-2 transform hover:translate-x-2 transition-transform">
                  <Shield className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>Safety zone notifications</span>
                </li>
                <li className="flex items-start gap-2 transform hover:translate-x-2 transition-transform">
                  <Shield className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>Community safety updates</span>
                </li>
              </ul>
              <div 
                className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 group-hover:from-violet-600 group-hover:to-indigo-700 text-white rounded-md px-4 py-2 flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  boxShadow: '0 10px 25px rgba(139, 92, 246, 0.35), 0 5px 10px rgba(99, 102, 241, 0.2)',
                  transform: 'translateZ(20px)'
                }}
              >
                <span>Continue as Citizen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer Info with 3D Effect */}
        <div className="mt-12 text-center transform-gpu" style={{ transform: 'translateZ(10px)' }}>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-violet-400 drop-shadow-[0_0_5px_rgba(139,92,246,0.6)]" />
            Secured with end-to-end encryption • Your data is protected
          </p>
        </div>
      </div>

      {/* ── SECTION 1: Unified Urban Intelligence Ecosystem ── */}
      <div className="relative z-10 py-24 px-4 border-t border-gray-800/60">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Unified Urban Intelligence Ecosystem</p>
          <h2 className="text-4xl font-bold text-white mb-4">One Platform. Every Urban Layer.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">SmartVieew integrates four autonomous intelligence verticals into a single operating layer for modern cities.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'SmartVieew Safety',
              desc: 'AI-driven threat detection, weapon identification, CCTV monitoring, and real-time crime prevention.',
              color: 'from-violet-500/20 to-indigo-500/20',
              border: 'border-violet-500/30',
              dot: 'bg-violet-400',
              text: 'text-violet-400',
            },
            {
              label: 'SmartVieew Traffic',
              desc: 'Autonomous traffic flow optimization, congestion prediction, signal intelligence, and incident routing.',
              color: 'from-blue-500/20 to-cyan-500/20',
              border: 'border-blue-500/30',
              dot: 'bg-blue-400',
              text: 'text-blue-400',
            },
            {
              label: 'SmartVieew Civic',
              desc: 'Infrastructure monitoring, civic issue detection, utility analytics, and predictive maintenance.',
              color: 'from-purple-500/20 to-pink-500/20',
              border: 'border-purple-500/30',
              dot: 'bg-purple-400',
              text: 'text-purple-400',
            },
            {
              label: 'SmartVieew Emergency',
              desc: 'Instant multi-agency coordination, dispatch automation, and resolution tracking for critical incidents.',
              color: 'from-red-500/20 to-orange-500/20',
              border: 'border-red-500/30',
              dot: 'bg-red-400',
              text: 'text-red-400',
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`bg-gradient-to-br ${item.color} backdrop-blur-sm border ${item.border} rounded-2xl p-6 flex flex-col gap-4`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${item.dot} shadow-[0_0_8px_currentColor]`}></div>
                <span className={`font-bold text-base ${item.text}`}>{item.label}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: Agentic AI — Agents + Workflow ── */}
      <div className="relative z-10 py-24 px-4 border-t border-gray-800/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Autonomous Decision Engine</p>
            <h2 className="text-4xl font-bold text-white mb-4">Beyond Detection. Towards Autonomy.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Four agentic AI layers work in concert to move from raw sensor data to a resolved incident — without human bottlenecks.</p>
          </div>

          {/* Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { num: '01', name: 'Detection Agent', desc: 'Monitors all feeds, identifies anomalies, weapons, and behavioral patterns in real time.', accent: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'from-emerald-500/10 to-emerald-500/5' },
              { num: '02', name: 'Risk Assessment Agent', desc: 'Scores threats by severity, cross-references historical data, and prioritises response.', accent: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'from-yellow-500/10 to-yellow-500/5' },
              { num: '03', name: 'Response Agent', desc: 'Selects optimal response protocol, coordinates multi-agency dispatch, triggers alarms.', accent: 'text-orange-400', border: 'border-orange-500/30', bg: 'from-orange-500/10 to-orange-500/5' },
              { num: '04', name: 'Reporting Agent', desc: 'Auto-generates incident reports, archives evidence, updates dashboards, and logs outcomes.', accent: 'text-purple-400', border: 'border-purple-500/30', bg: 'from-purple-500/10 to-purple-500/5' },
            ].map((agent) => (
              <div key={agent.name} className={`bg-gradient-to-br ${agent.bg} border ${agent.border} rounded-2xl p-6`}>
                <div className={`text-3xl font-black mb-3 ${agent.accent} opacity-40`}>{agent.num}</div>
                <h3 className={`font-bold text-base mb-2 ${agent.accent}`}>{agent.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>

          {/* Autonomous Incident Workflow */}
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-white font-bold text-lg text-center mb-8">Autonomous Incident Workflow</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {[
                { step: 'Incident Detected', icon: '⚡', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
                { step: 'Risk Analysis', icon: '🧠', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
                { step: 'Decision Recommendation', icon: '🎯', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
                { step: 'Notification Dispatched', icon: '📡', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
                { step: 'Resolution Tracked', icon: '✅', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
              ].map((item, idx, arr) => (
                <React.Fragment key={item.step}>
                  <div className={`flex flex-col items-center text-center border rounded-xl px-4 py-4 min-w-[120px] ${item.bg}`}>
                    <span className="text-2xl mb-2">{item.icon}</span>
                    <span className={`text-xs font-semibold ${item.color}`}>{item.step}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-600 hidden md:block flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Roadmap — Campus to Smart City ── */}
      <div className="relative z-10 py-24 px-4 border-t border-gray-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">Growth Roadmap</p>
            <h2 className="text-4xl font-bold text-white mb-4">From Campus Security to Smart Cities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A phased evolution — each stage expanding intelligence, scale, and autonomy across urban environments.</p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/60 via-cyan-500/40 to-purple-500/30 hidden md:block" style={{ transform: 'translateX(-50%)' }}></div>
            <div className="space-y-8">
              {[
                { year: '2026', title: 'Campus Safety Intelligence', desc: 'Deploy SmartVieew on university and corporate campuses — CCTV monitoring, weapon detection, access control, and incident reporting.', side: 'left', accent: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/30' },
                { year: '2027', title: 'Township Intelligence Platform', desc: 'Expand to residential townships and gated communities — traffic management, community alerts, civic monitoring, and emergency response.', side: 'right', accent: 'text-cyan-400', dot: 'bg-cyan-400', border: 'border-cyan-500/30' },
                { year: '2028', title: 'Urban Operations Platform', desc: 'Full-city deployment covering commercial zones, public transport hubs, and government districts with multi-agency coordination.', side: 'left', accent: 'text-blue-400', dot: 'bg-blue-400', border: 'border-blue-500/30' },
                { year: '2029+', title: 'Smart City Operating System', desc: 'SmartVieew becomes the autonomous intelligence backbone of the entire city — real-time decisions across safety, traffic, civic, and emergency layers.', side: 'right', accent: 'text-purple-400', dot: 'bg-purple-400', border: 'border-purple-500/30' },
              ].map((item, idx) => (
                <div key={item.year} className={`flex items-center gap-8 ${item.side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:flex-row`}>
                  <div className="flex-1 md:text-right">
                    {item.side === 'left' && (
                      <div className={`bg-gray-900/60 border ${item.border} rounded-xl p-5`}>
                        <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${item.accent}`}>{item.year}</div>
                        <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                    {item.side === 'right' && <div className="hidden md:block" />}
                  </div>
                  <div className={`w-4 h-4 rounded-full ${item.dot} ring-4 ring-gray-900 shadow-[0_0_12px_currentColor] flex-shrink-0 hidden md:block`}></div>
                  <div className="flex-1">
                    {item.side === 'right' && (
                      <div className={`bg-gray-900/60 border ${item.border} rounded-xl p-5`}>
                        <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${item.accent}`}>{item.year}</div>
                        <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                    {item.side === 'left' && <div className="hidden md:block" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: OS for Future Cities ── */}
      <div className="relative z-10 py-24 px-4 border-t border-gray-800/60">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">The Mission</p>
          <h2 className="text-4xl font-bold text-white mb-4">Building the Operating System for Future Cities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">SmartVieew delivers four foundational pillars that every modern city demands — unified under one autonomous intelligence layer.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '🛡️', title: 'Public Safety', desc: 'AI-powered threat detection, weapon identification, real-time alerts, and evidence capture across all urban zones.' },
            { icon: '🚦', title: 'Traffic Efficiency', desc: 'Autonomous signal control, congestion prediction, incident routing, and mobility optimization for seamless urban flow.' },
            { icon: '🚨', title: 'Emergency Response', desc: 'Instant multi-agency coordination, automated dispatch, resource allocation, and resolution tracking for every critical event.' },
            { icon: '🏗️', title: 'Infrastructure Management', desc: 'Predictive monitoring of civic assets, utility networks, and public infrastructure to prevent failures before they occur.' },
          ].map((pillar) => (
            <div key={pillar.title} className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 border border-gray-700/40 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors">
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <h3 className="text-white font-bold text-base mb-3">{pillar.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-full px-8 py-4">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm font-medium">SmartVieew AI — Autonomous Urban Intelligence, Active</span>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

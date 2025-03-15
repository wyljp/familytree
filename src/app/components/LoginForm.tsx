"use client";

import { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { getFamilyFullName } from '@/utils/config';
import Link from 'next/link';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState('');
  // 获取完整姓氏名称（带"氏"字）
  const familyFullName = getFamilyFullName();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDebug('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      
      if (data.success) {
        setDebug(`登录成功！欢迎 ${name}`);
        // 保存token到localStorage
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_time', Date.now().toString());
        onLoginSuccess();
      } else {
        // 登录失败时只显示错误消息，不显示调试信息
        setError(data.message || '验证失败，请检查姓名');
      }
    } catch (err) {
      console.error('验证请求错误:', err);
      setError('验证过程中出现错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 添加一个辅助函数，显示有效的用户信息（仅用于调试）
  const showHint = () => {
    setDebug('请输入家谱中的人名登录');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{familyFullName}家谱</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            请输入姓名进行验证
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">姓名</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="姓名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? '验证中...' : '进入家谱'}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button 
              type="button" 
              onClick={showHint}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              需要帮助？
            </button>
          </div>
          
          {debug && (
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-700 whitespace-pre-line">
              {debug}
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-sm text-blue-600 font-medium">
              这是一个开源项目，访问我们的 
              <Link 
                href="https://github.com/jiujiaoxieeba/familytree" 
                target="_blank"
                rel="noopener noreferrer" 
                className="ml-1 text-blue-700 hover:text-blue-900 hover:underline"
              >
                GitHub仓库
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 
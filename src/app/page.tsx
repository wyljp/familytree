"use client";

import { useState, useEffect } from 'react';
import FamilyTree from './components/FamilyTree';
import TreeView from './components/TreeView';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import { useFamilyData } from '../data/familyDataWithIds';
import { QueueListIcon, Squares2X2Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { getPublicConfig, getFamilyFullName } from '@/utils/config';
import { FamilyData } from '@/types/family';

export default function Home() {
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const { data: familyData, loading: dataLoading, error: dataError } = useFamilyData();
  
  // 从配置中获取是否需要登录的设置和姓氏
  const publicConfig = getPublicConfig();
  const requireAuth = publicConfig.isAuthRequired;
  const familyFullName = getFamilyFullName();

  // 创建空的默认树结构
  const emptyTreeData: FamilyData = {
    "generations": [
      {
        "title": "第一世1",
        "people": [
          {
            "id": "bai-meng-xiong",
            "name": "白萌堂",
            "birthYear": 1820,
            "deathYear": 1900,
            "info": "大宅门创始人，太医院御医，生三子：白颖园、白颖轩、白颖宇"
          }
        ]
      },
      {
        "title": "第二世",
        "people": [
          {
            "id": "bai-ying-yuan",
            "name": "白颖园",
            "birthYear": 1845,
            "deathYear": 1925,
            "info": "长子，继承家业，妻李氏，生二子：白景怡、白景泗",
            "fatherId": "bai-meng-xiong"
          },
          {
            "id": "bai-ying-xuan",
            "name": "白颖轩",
            "birthYear": 1850,
            "deathYear": 1895,
            "info": "次子，妻白文氏（二奶奶），生一子白景琦，生一女白玉婷",
            "fatherId": "bai-meng-xiong"
          },
          {
            "id": "bai-ying-yu",
            "name": "白颖宇",
            "birthYear": 1855,
            "deathYear": 1938,
            "info": "三子，纨绔子弟，妻周氏，生一子白景武，生一女白玉芬",
            "fatherId": "bai-meng-xiong"
          }
        ]
      },
      {
        "title": "第三世",
        "people": [
          {
            "id": "bai-jing-yi",
            "name": "白景怡",
            "birthYear": 1870,
            "deathYear": 1955,
            "info": "白颖园长子，继承医业，妻王氏，生一子白占元",
            "fatherId": "bai-ying-yuan"
          },
          {
            "id": "bai-jing-si",
            "name": "白景泗",
            "birthYear": 1873,
            "deathYear": 1958,
            "info": "白颖园次子，妻赵氏，生一子白占光",
            "fatherId": "bai-ying-yuan"
          },
          {
            "id": "bai-jing-qi",
            "name": "白景琦",
            "birthYear": 1880,
            "deathYear": 1970,
            "info": "白颖轩独子，大宅门核心人物，原配黄春，继娶杨九红、李香秀，生四子：白敬业、白敬功、白敬生、白敬堂",
            "fatherId": "bai-ying-xuan"
          },
          {
            "id": "bai-jing-wu",
            "name": "白景武",
            "birthYear": 1885,
            "deathYear": 1960,
            "info": "白颖宇之子，妻孙氏，生一子白占海",
            "fatherId": "bai-ying-yu"
          }
        ]
      },
      {
        "title": "第四世",
        "people": [
          {
            "id": "bai-zhan-yuan",
            "name": "白占元",
            "birthYear": 1900,
            "deathYear": 1980,
            "info": "白景怡之子，投身革命，妻何琪，生一子白建国",
            "fatherId": "bai-jing-yi"
          },
          {
            "id": "bai-zhan-guang",
            "name": "白占光",
            "birthYear": 1905,
            "deathYear": 1985,
            "info": "白景泗之子，妻吴氏，生一女白晓梅",
            "fatherId": "bai-jing-si"
          },
          {
            "id": "bai-jing-ye",
            "name": "白敬业",
            "birthYear": 1903,
            "deathYear": 1965,
            "info": "白景琦长子，纨绔败家，妻唐幼琼，生一子白占安",
            "fatherId": "bai-jing-qi"
          },
          {
            "id": "bai-jing-gong",
            "name": "白敬功",
            "birthYear": 1908,
            "deathYear": 1992,
            "info": "白景琦次子，继承家业，妻周氏，生一子白占平",
            "fatherId": "bai-jing-qi"
          },
          {
            "id": "bai-zhan-hai",
            "name": "白占海",
            "birthYear": 1910,
            "deathYear": 1990,
            "info": "白景武之子，妻李氏，生一子白建军",
            "fatherId": "bai-jing-wu"
          }
        ]
      },
      {
        "title": "第五世",
        "people": [
          {
            "id": "bai-jian-guo",
            "name": "白建国",
            "birthYear": 1930,
            "deathYear": 2010,
            "info": "白占元之子，工程师，妻张丽华，生一子白浩然",
            "fatherId": "bai-zhan-yuan"
          },
          {
            "id": "bai-zhan-an",
            "name": "白占安",
            "birthYear": 1935,
            "deathYear": 2005,
            "info": "白敬业之子，妻王秀兰，生一女白雨欣",
            "fatherId": "bai-jing-ye"
          },
          {
            "id": "bai-zhan-ping",
            "name": "白占平",
            "birthYear": 1940,
            "deathYear": 2020,
            "info": "白敬功之子，商人，妻陈美玲，生一子白浩宇",
            "fatherId": "bai-jing-gong"
          },
          {
            "id": "bai-jian-jun",
            "name": "白建军",
            "birthYear": 1945,
            "deathYear": 2015,
            "info": "白占海之子，医生，妻刘芳，生一子白浩轩",
            "fatherId": "bai-zhan-hai"
          }
        ]
      }
    ]
  };

  // 创建树状结构数据
  const [treeData, setTreeData] = useState(emptyTreeData);
  
  // 当家族数据加载完成后，重新构建树状结构
  useEffect(() => {
    if (!dataLoading && !dataError) {
      try {
        // 创建一个映射，用于快速查找人物
        const personMap = new Map();
        
        // 首先将所有人物添加到映射中
        familyData.generations.forEach(generation => {
          generation.people.forEach(person => {
            personMap.set(person.id, { ...person, children: [] });
          });
        });
        
        // 根据 fatherId 建立父子关系
        familyData.generations.forEach(generation => {
          generation.people.forEach(person => {
            if (person.fatherId && personMap.has(person.fatherId)) {
              const father = personMap.get(person.fatherId);
              if (father) {
                father.children = [...(father.children || []), personMap.get(person.id)];
              }
            }
          });
        });
        
        // 找到第一代人物（没有 fatherId 的人）
        const rootPeople = familyData.generations[0].people.map(person => personMap.get(person.id));
        
        // 创建树状结构的个人数据
        setTreeData({
          generations: [
            {
              title: "家族树",
              people: rootPeople
            }
          ]
        });
      } catch (error) {
        console.error('构建树状结构出错:', error);
      }
    }
  }, [familyData, dataLoading, dataError]);

  useEffect(() => {
    // 始终假设需要登录验证 - 真实的验证会在服务器端处理
    
    // 检查是否已经验证过
    const token = localStorage.getItem('auth_token');
    const authTime = localStorage.getItem('auth_time');
    
    if (token && authTime) {
      try {
        // 使用Buffer解码token
        const tokenData = Buffer.from(token, 'base64').toString();
        const parsedToken = JSON.parse(tokenData);
        const expirationTime = parsedToken.exp;
        const currentTime = Date.now();
        
        // 检查token是否过期（24小时）
        if (currentTime < expirationTime) {
          setIsAuthenticated(true);
          setUserName(parsedToken.name || '');
        } else {
          // 清除过期的token
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_time');
        }
      } catch (error) {
        console.error('Token解析错误:', error);
        // token解析错误，清除
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_time');
      }
    }
    
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    // 清除验证信息
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_time');
    setIsAuthenticated(false);
  };

  // 显示加载状态
  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 如果需要登录且未验证，显示登录表单
  if (requireAuth && !isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // 已验证或不需要登录，显示家谱内容
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4 py-6 relative">
          {/* 只有在需要登录且已登录的情况下才显示退出按钮 */}
          {requireAuth && isAuthenticated && (
            <div className="absolute right-4 top-4">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1" />
                退出
              </button>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            {familyFullName}族谱
          </h1>
          <p className="mt-2 text-gray-500 text-center text-sm tracking-wide">
            传承历史 · 延续文化
          </p>
          {requireAuth && userName && (
            <p className="mt-1 text-blue-500 text-center text-xs">
              欢迎您，{familyFullName}族人
            </p>
          )}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-md flex items-center ${
                  viewMode === 'list'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('list')}
              >
                <QueueListIcon className="h-4 w-4 mr-2" />
                列表视图
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-md flex items-center ${
                  viewMode === 'tree'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('tree')}
              >
                <Squares2X2Icon className="h-4 w-4 mr-2" />
                树状视图
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-grow">
        {dataError && (
          <div className="text-center text-red-500 mb-4">
            {dataError} - 使用默认数据
          </div>
        )}
        
        {viewMode === 'list' ? (
          <FamilyTree familyData={familyData} />
        ) : (
          <TreeView data={treeData} />
        )}
      </div>
      
      <Footer />
    </main>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Switch } from '../../components/ui/Switch';
import { Separator } from '../../components/ui/Seperator';
import { 
  Users, 
  UserCheck, 
  Activity, 
  BarChart3, 
  Settings, 
  Shield, 
  Database,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Download,
  Eye,
  Edit,
  Plus,
  MoreHorizontal
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  totalRevenue: number;
  activeUsers: number;
  pendingApprovals: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

interface SystemLog {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  user?: string;
}

export function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const stats: AdminStats = {
    totalUsers: 1247,
    totalDoctors: 89,
    totalPatients: 1158,
    totalAppointments: 3421,
    totalRevenue: 125000,
    activeUsers: 892,
    pendingApprovals: 12,
    systemHealth: 'excellent'
  };

  const users: User[] = [
    {
      id: '1',
      name: 'Dr. Ahmet Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      role: 'doctor',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2023-06-15T09:00:00Z'
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse.demir@example.com',
      role: 'patient',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      createdAt: '2023-08-20T14:30:00Z'
    },
    {
      id: '3',
      name: 'Dr. Mehmet Kaya',
      email: 'mehmet.kaya@example.com',
      role: 'doctor',
      status: 'pending',
      lastLogin: '2024-01-14T16:45:00Z',
      createdAt: '2024-01-10T11:20:00Z'
    }
  ];

  const systemLogs: SystemLog[] = [
    {
      id: '1',
      type: 'success',
      message: 'New doctor registration approved',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'Dr. Ahmet Yılmaz'
    },
    {
      id: '2',
      type: 'warning',
      message: 'High server load detected',
      timestamp: '2024-01-15T09:45:00Z'
    },
    {
      id: '3',
      type: 'info',
      message: 'Daily backup completed successfully',
      timestamp: '2024-01-15T02:00:00Z'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'info': return <FileText className="w-4 h-4 text-blue-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Sistem yönetimi ve kullanıcı kontrolü</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Doktor</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Randevu</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                  <p className="text-2xl font-bold text-gray-900">₺{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="users">Kullanıcı Yönetimi</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
            <TabsTrigger value="system">Sistem</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Sistem Durumu</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sistem Sağlığı</span>
                      <Badge className={getSystemHealthColor(stats.systemHealth)}>
                        {stats.systemHealth}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Aktif Kullanıcılar</span>
                      <span className="font-semibold">{stats.activeUsers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Bekleyen Onaylar</span>
                      <span className="font-semibold text-yellow-600">{stats.pendingApprovals}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Son Aktiviteler</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start space-x-3">
                        {getLogIcon(log.type)}
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{log.message}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleString('tr-TR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kullanıcı Yönetimi</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Kullanıcı ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                    <option value="pending">Beklemede</option>
                  </select>
                  <Button className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Yeni Kullanıcı</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Kullanıcı İstatistikleri</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Doktorlar</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(stats.totalDoctors / stats.totalUsers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.totalDoctors}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hastalar</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(stats.totalPatients / stats.totalUsers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.totalPatients}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Gelir Analizi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">₺{stats.totalRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Toplam Gelir</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-blue-600">{stats.totalAppointments}</p>
                        <p className="text-xs text-gray-600">Toplam Randevu</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-purple-600">
                          ₺{(stats.totalRevenue / stats.totalAppointments).toFixed(0)}
                        </p>
                        <p className="text-xs text-gray-600">Ortalama Randevu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Sistem Logları</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {systemLogs.map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        {getLogIcon(log.type)}
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{log.message}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleString('tr-TR')}
                            {log.user && ` • ${log.user}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Güvenlik Durumu</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">SSL Sertifikası</span>
                      <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Firewall</span>
                      <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Son Yedekleme</span>
                      <span className="text-sm font-medium">2 saat önce</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Disk Kullanımı</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Sistem Ayarları</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance">Bakım Modu</Label>
                      <p className="text-sm text-gray-600">Sistem bakımı sırasında erişimi kısıtla</p>
                    </div>
                    <Switch id="maintenance" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">E-posta Bildirimleri</Label>
                      <p className="text-sm text-gray-600">Sistem olayları için e-posta gönder</p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="backup">Otomatik Yedekleme</Label>
                      <p className="text-sm text-gray-600">Günlük otomatik veri yedekleme</p>
                    </div>
                    <Switch id="backup" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Hızlı İşlemler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Veri Dışa Aktar</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>Veritabanı Yedekle</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Güvenlik Taraması</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span>Sistem Durumu</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 
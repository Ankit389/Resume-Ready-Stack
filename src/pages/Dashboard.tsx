import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Clock, CheckCircle, AlertCircle, Edit3, ArrowRight, Briefcase, LogOut, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../lib/api';
import { formatDate, formatPrice } from '../lib/utils';

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate('/login', { state: { from: { pathname: '/dashboard' } } });
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || '', phone: user.phone || '' });
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await userAPI.getOrders();
      setOrders(res.data.data || []);
    } catch {
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await userAPI.updateProfile(profile);
      setSaved(true);
      setEditMode(false);
      setTimeout(() => setSaved(false), 3000);
    } catch { }
    finally { setSaving(false); }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F172A' }}>
      <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isAuthenticated) return null;

  const statusColor: Record<string, string> = {
    pending: 'warning',
    paid: 'success',
    failed: 'destructive',
    refunded: 'secondary',
  };

  return (
    <div className="min-h-screen bg-[#060612] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-500/30">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Welcome, {user?.name.split(' ')[0]}! 👋</h1>
              <p className="text-slate-400 text-sm">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/5">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Package, label: 'Total Orders', value: orders.length, color: 'text-purple-400' },
            { icon: CheckCircle, label: 'Completed', value: orders.filter(o => o.status === 'paid').length, color: 'text-emerald-400' },
            { icon: Clock, label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'text-amber-400' },
            { icon: TrendingUp, label: 'Total Spent', value: `₹${orders.filter(o => o.status === 'paid').reduce((s, o) => s + o.amount, 0).toLocaleString('en-IN')}`, color: 'text-blue-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label}>
              <CardContent className="p-5">
                <div className={`${color} mb-2`}><Icon className="w-5 h-5" /></div>
                <div className={`text-2xl font-black ${color}`}>{value}</div>
                <div className="text-slate-400 text-xs mt-1">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>My Orders</CardTitle>
                <Link to="/pricing"><Button size="sm" variant="outline">New Order <ArrowRight className="w-3 h-3" /></Button></Link>
              </CardHeader>
              <CardContent>
                {loadingOrders ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 mb-5">No orders yet. Get started with a service!</p>
                    <Link to="/pricing"><Button variant="glow">Browse Plans <ArrowRight className="w-4 h-4" /></Button></Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div key={order._id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                        <div>
                          <div className="text-white font-semibold text-sm">{order.planName}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{formatDate(order.createdAt)}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-purple-300 font-semibold text-sm">{formatPrice(order.amount)}</span>
                          <Badge variant={(statusColor[order.status] || 'secondary') as any}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile */}
          <div>
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Profile</CardTitle>
                <button onClick={() => setEditMode(!editMode)} className="text-purple-400 hover:text-purple-300 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </CardHeader>
              <CardContent>
                {saved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-4 text-emerald-400 text-sm">
                    <CheckCircle className="w-4 h-4" /> Profile saved!
                  </div>
                )}
                {editMode ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label>Full Name</Label>
                      <Input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Phone</Label>
                      <Input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Email</Label>
                      <Input value={user?.email || ''} disabled className="opacity-50" />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={saveProfile} disabled={saving} className="flex-1">{saving ? 'Saving...' : 'Save'}</Button>
                      <Button size="sm" variant="secondary" onClick={() => setEditMode(false)} className="flex-1">Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-black">
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-bold">{user?.name}</div>
                        <div className="text-slate-400 text-xs">{user?.role === 'admin' ? '⭐ Admin' : 'Member'}</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="text-slate-200 truncate max-w-32">{user?.email}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Phone</span><span className="text-slate-200">{user?.phone || 'Not set'}</span></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-5">
                <h3 className="text-white font-bold mb-3 text-sm">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/pricing"><Button variant="secondary" className="w-full justify-start text-sm" size="sm"><Package className="w-4 h-4" />New Service</Button></Link>
                  <Link to="/contact"><Button variant="secondary" className="w-full justify-start text-sm" size="sm"><Briefcase className="w-4 h-4" />Get Support</Button></Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

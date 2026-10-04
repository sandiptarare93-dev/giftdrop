import { dbStore } from '../models/dataStore.js';

export const getAdminAnalytics = async (req, res) => {
  try {
    const users = await dbStore.users.find();
    const orders = await dbStore.orders.find();
    const surprises = await dbStore.surprises.find();
    const products = await dbStore.products.find();

    const totalUsers = users.length;
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.paymentStatus === 'completed');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const activeSurprises = surprises.filter(s => s.status === 'published').length;
    const totalSurpriseViews = surprises.reduce((sum, s) => sum + (s.views || 0), 0);

    // Occasions breakdown
    const occasionsMap = {};
    for (const s of surprises) {
      const p = products.find(prod => prod.id === s.productId);
      const occasionName = p ? p.occasion : 'other';
      occasionsMap[occasionName] = (occasionsMap[occasionName] || 0) + 1;
    }
    const occasionBreakdown = Object.entries(occasionsMap).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      count
    }));

    // Monthly revenue simulation data for chart
    const revenueTrends = [
      { month: 'Oct', revenue: 14200, orders: 48 },
      { month: 'Nov', revenue: 18900, orders: 64 },
      { month: 'Dec', revenue: 29500, orders: 98 },
      { month: 'Jan', revenue: 24800, orders: 82 },
      { month: 'Feb', revenue: 38400, orders: 126 },
      { month: 'Mar', revenue: 31200, orders: 104 }
    ];

    // Surprise Creation timeline
    const activityTimeline = [
      { day: 'Mon', surprises: 14, views: 182 },
      { day: 'Tue', surprises: 19, views: 240 },
      { day: 'Wed', surprises: 22, views: 310 },
      { day: 'Thu', surprises: 18, views: 275 },
      { day: 'Fri', surprises: 28, views: 420 },
      { day: 'Sat', surprises: 39, views: 590 },
      { day: 'Sun', surprises: 45, views: 680 }
    ];

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue,
        activeSurprises,
        totalSurpriseViews,
        conversionRate: '4.8%'
      },
      occasionBreakdown,
      revenueTrends,
      activityTimeline,
      topProducts: products.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const statusColors = {
  Requested: 'bg-gray-100 text-gray-800 border-gray-300',
  Ordered: 'bg-blue-100 text-blue-800 border-blue-300',
  Received: 'bg-orange-100 text-orange-800 border-orange-300',
  Invoiced: 'bg-purple-100 text-purple-800 border-purple-300',
  Paid: 'bg-green-100 text-green-800 border-green-300',
};

const StatusBadge = ({ status }) => {
  const className = statusColors[status] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;

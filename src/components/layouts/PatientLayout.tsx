import React from 'react';
import RequireRole from '../auth/RequireRole';

const PatientLayout: React.FC = () => {
  return (
    <RequireRole allowedRoles={['patient']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Hasta Paneli
            </h1>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Hoşgeldiniz! Bu alan sadece hastalar için erişilebilir.
              </h2>
              <p className="text-gray-600">
                Burada hasta özel içerikleri ve randevu bilgilerinizi görüntüleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
};

export default PatientLayout; 
import React from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Qeydiyyat məlumatları:', data);
        alert('Qeydiyyat uğurla tamamlandı!');
        reset();
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-20 bg-white rounded-lg shadow border">
      <h2 className="text-2xl font-bold mb-6">Qeydiyyat Formu</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Ad sahəsi */}
        <div>
          <label className="block text-sm font-medium mb-1">Ad</label>
          <input 
            type="text" 
            {...register('username', { 
              required: 'Ad daxil edilməlidir',
              minLength: { value: 3, message: 'Ad ən az 3 simvoldan ibarət olmalıdır' }
            })}
            className="border p-2 rounded w-full"
            placeholder="Adınızı yazın..."
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>

        {/* Email sahəsi */}
        <div>
          <label className="block text-sm font-medium mb-1">E-poçt</label>
          <input 
            type="email" 
            {...register('email', { 
              required: 'E-poçt daxil edilməlidir',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Düzgün e-poçt ünvanı daxil edin'
              }
            })}
            className="border p-2 rounded w-full"
            placeholder="example@mail.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Şifrə sahəsi */}
        <div>
          <label className="block text-sm font-medium mb-1">Şifrə</label>
          <input 
            type="password" 
            {...register('password', { 
              required: 'Şifrə daxil edilməlidir',
              minLength: { value: 6, message: 'Şifrə ən az 6 simvoldan ibarət olmalıdır' }
            })}
            className="border p-2 rounded w-full"
            placeholder="******"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer disabled:bg-gray-300 mt-2"
        >
          {isSubmitting ? 'Göndərilir...' : 'Qeydiyyatdan keç'}
        </button>
      </form>
    </div>
  );
}
'use client';
import { motion } from 'framer-motion';
import { HiX, HiCalendar, HiUser, HiMail, HiChatAlt } from 'react-icons/hi'; 
import { MdCheckCircle, MdCancel } from 'react-icons/md';

export default function RequestModal({ isOpen, onClose, requests, onAction }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-slate-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-700/60 z-10 relative transition-colors duration-300"
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Adoption Applications 🐾
          </h3>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition text-slate-500 dark:text-slate-400"
          >
            <HiX size={22} />
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {requests.length === 0 ? (
            <p className="text-center py-8 text-slate-500 dark:text-slate-400 font-medium">
              No adoption requests received for this pet yet.
            </p>
          ) : (
            requests.map((req) => (
              <div 
                key={req._id} 
                className="p-5 rounded-2xl bg-slate-52 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/40 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-base">
                    <HiUser className="text-amber-500 flex-shrink-0" />
                    <span>{req.requesterName}</span>
                    {req.status !== 'pending' && (
                      <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ml-2 ${
                        req.status === 'approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {req.status}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <HiMail className="text-slate-400 flex-shrink-0" />
                    <span>{req.requesterEmail}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <HiCalendar className="text-slate-400 flex-shrink-0" />
                    <span>Target Pickup: {new Date(req.pickupDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 mt-2 bg-white dark:bg-slate-800/80 p-3 rounded-xl border dark:border-slate-700/30">
                    <HiChatAlt className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="italic">"{req.message}"</p>
                  </div>
                </div>

                {req.status === 'pending' && (
                  <div className="flex sm:flex-col gap-2 justify-end">
                    <button 
                      onClick={() => onAction(req._id, 'approved')}
                      className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-xs transition active:scale-95"
                    >
                      <MdCheckCircle size={18} />
                      <span>Approve</span>
                    </button>

                    <button 
                      onClick={() => onAction(req._id, 'rejected')}
                      className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-red-500 dark:hover:bg-red-500 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white font-bold px-4 py-2 rounded-xl text-sm transition active:scale-95"
                    >
                      <MdCancel size={18} />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
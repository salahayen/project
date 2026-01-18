
import React, { useState } from 'react';
import { Zap, Trash2, ShieldAlert, Terminal } from 'lucide-react';

const RescuePage = () => {
    const [key, setKey] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const log = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

    const runAction = async (endpoint: string, name: string) => {
        if (!key) return alert('Enter System Key');
        setLoading(true);
        log(`Starting ${name}...`);
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({ key })
            });
            const data = await res.json();

            if (res.ok) {
                log(`✅ ${name} Success!`);
                if (data.output) log(data.output);
                if (data.message) log(data.message);
            } else {
                log(`❌ ${name} Failed: ${data.details || data.error}`);
            }
        } catch (e: any) {
            log(`❌ Network Error: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-mono">
            <div className="max-w-2xl mx-auto space-y-8">
                <header className="flex items-center gap-4 border-b border-gray-700 pb-6">
                    <ShieldAlert className="text-red-500 w-12 h-12" />
                    <div>
                        <h1 className="text-2xl font-bold text-red-500">System Rescue Console</h1>
                        <p className="text-gray-400">Emergency Maintenance Mode</p>
                    </div>
                </header>

                <div className="space-y-4">
                    <label className="block text-sm text-gray-400">System Key</label>
                    <input
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full bg-gray-800 border-gray-700 rounded p-3 text-white focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter admin key..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => runAction('/api/migrate', 'Schema Migration')}
                        disabled={loading}
                        className="p-6 bg-yellow-900/30 border border-yellow-700/50 rounded-lg hover:bg-yellow-900/50 transition flex flex-col items-center gap-3 group"
                    >
                        <Zap className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition" />
                        <span className="font-bold text-yellow-500">Fix Schema (Migrate)</span>
                        <span className="text-xs text-yellow-200/50 text-center">Use if login fails with "User.code missing"</span>
                    </button>

                    <button
                        onClick={() => runAction('/api/seed', 'Database Seed')}
                        disabled={loading}
                        className="p-6 bg-red-900/30 border border-red-700/50 rounded-lg hover:bg-red-900/50 transition flex flex-col items-center gap-3 group"
                    >
                        <Trash2 className="w-8 h-8 text-red-500 group-hover:scale-110 transition" />
                        <span className="font-bold text-red-500">Reset & Seed DB</span>
                        <span className="text-xs text-red-200/50 text-center">Wipes data and restores default services/plans</span>
                    </button>
                </div>

                <div className="bg-black/50 rounded-lg border border-gray-800 p-4 h-64 overflow-y-auto">
                    <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-gray-800 pb-2">
                        <Terminal size={14} />
                        <span className="text-xs uppercase">Console Output</span>
                    </div>
                    {logs.length === 0 && <span className="text-gray-600 italic">Ready for commands...</span>}
                    {logs.map((L, i) => (
                        <div key={i} className="text-sm font-mono text-green-400/80 mb-1">{L}</div>
                    ))}
                </div>

                <div className="text-center pt-8">
                    <a href="/" className="text-gray-500 hover:text-white underline">Back to Home</a>
                </div>
            </div>
        </div>
    );
};

export default RescuePage;

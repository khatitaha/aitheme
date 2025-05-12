"use client"

import React, { useState } from 'react'
import { Users, FileUp, Send, Check } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'; // your Supabase client



type Props = {
    patients: any[];
}

const SendScansPage = (props: Props) => {
    const supabase = createClient();
    const { patients } = props
    const [selectedPatientId, setSelectedPatientId] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [sentStatus, setSentStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [fileName, setFileName] = useState<string>('');

    const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPatientId(e.target.value);
        setSentStatus('idle'); // Reset status on new selection
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
            setSentStatus('idle'); // Reset status on new file selection
        } else {
            setSelectedFile(null);
            setFileName('');
        }
    };

    const sendingScan = async () => {
        if (!selectedPatientId || !selectedFile) {
            alert('Please select a patient and a scan file.');
            return;
        }

        setIsSending(true);
        setSentStatus('idle');

        console.log(`Sending scan "${selectedFile.name}" to patient ID: ${selectedPatientId}`);

        try {
            // 1. Upload the file to storage
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('scans') // bucket name
                .upload(`user/${selectedPatientId}/${Date.now()}_${selectedFile.name}`, selectedFile);

            if (uploadError) {
                console.log(uploadError);
                console.error('Upload error:', uploadError);
                throw new Error('Failed to upload scan.');
            }
            console.log('File uploaded at:', uploadData.path);

            // 2. Get public URL (optional, if you want to show/download it later)
            const { data: urlData } = supabase
                .storage
                .from('scans')
                .getPublicUrl(uploadData.path);

            const publicUrl = urlData?.publicUrl || null;

            // 3. Insert a record into your `scans` table
            const { error: insertError } = await supabase
                .from('scans') // your table name
                .insert({
                    user_id: selectedPatientId,
                    file_path: uploadData.path,
                    image_url: publicUrl,
                });

            if (!insertError) { // Only proceed if the scan record was inserted successfully
                console.log('Scan record inserted. Updating user profile.');
                const { error: profileUpdateError } = await supabase
                    .from('profile') // your profile table name
                    .update({ resident: true })
                    .eq('id', selectedPatientId); // Assuming 'id' is the column linking to the user ID

                const { error: profile2UpdateError } = await supabase
                    .from('profile') // your profile table name
                    .update({ aiDetect: true })
                    .eq('id', selectedPatientId); // Assuming 'id' is the column linking to the user ID

                if (profileUpdateError) {
                    console.error('Profile update error:', profileUpdateError);
                    // Decide how to handle this error - maybe log it but don't fail the whole process
                    // or revert the scan insert? For now, we'll just log.
                } else {
                    console.log(`User profile ${selectedPatientId} marked as paid.`);
                }
            }

            if (insertError) {
                console.error('Insert error:', insertError);
                throw new Error('Failed to save scan data.');
            }

            console.log('Scan sent and recorded successfully.');
            setSentStatus('success');

            // Optionally reset form
            // setSelectedPatientId('');
            // setSelectedFile(null);
            // setFileName('');

        } catch (error) {
            console.error('Error sending scan:', error);
            setSentStatus('error');
            alert('Failed to send scan. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className=''>
            <div></div>
            {/* Header */}
            <div className="mb-8 ">
                <h1 className="text-3xl font-bold text-white">Send Scan to Patient</h1>
                <p className="text-neutral-400">Select a patient and upload the scan file to send.</p>
            </div>

            {/* Send Scan Form Card */}
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                <div className="space-y-6">
                    {/* Patient Selection */}
                    <div>
                        <label htmlFor="patientSelect" className="block text-sm font-medium text-neutral-300 mb-2">
                            Select Patient
                        </label>
                        <div className="relative">
                            <Users className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            <select
                                id="patientSelect"
                                value={selectedPatientId}
                                onChange={handlePatientChange}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                disabled={isSending}
                            >
                                <option value="" disabled>-- Select a Patient --</option>
                                {/* {mockPatients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name} ({patient.email})
                                    </option>
                                ))} */}
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name} ({patient.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label htmlFor="scanFile" className="block text-sm font-medium text-neutral-300 mb-2">
                            Upload Scan File
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="scanFile"
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 hover:bg-neutral-700 transition-colors ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FileUp className="w-8 h-8 mb-3 text-neutral-400" />
                                    {fileName ? (
                                        <p className="text-sm text-white font-semibold">{fileName}</p>
                                    ) : (
                                        <>
                                            <p className="mb-1 text-sm text-neutral-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-neutral-500">PNG, JPG, DICOM, etc. (Max 50MB)</p> {/* Adjust allowed types/size */}
                                        </>
                                    )}
                                </div>
                                <input
                                    id="scanFile"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".png,.jpg,.jpeg,.dcm" // Adjust accepted file types
                                    disabled={isSending}
                                />
                            </label>
                        </div>
                        {fileName && !isSending && (
                            <button
                                onClick={() => { setSelectedFile(null); setFileName(''); }}
                                className="text-xs text-red-500 hover:text-red-400 mt-1"
                            >
                                Remove file
                            </button>
                        )}
                    </div>

                    {/* Send Button */}
                    <div className="flex justify-end items-center">
                        {sentStatus === 'success' && (
                            <span className="text-sm text-green-500 mr-4 flex items-center gap-1">
                                <Check className="w-4 h-4" /> Scan Sent Successfully!
                            </span>
                        )}
                        {sentStatus === 'error' && (
                            <span className="text-sm text-red-500 mr-4">
                                Sending Failed.
                            </span>
                        )}
                        <button
                            onClick={sendingScan}
                            disabled={!selectedPatientId || !selectedFile || isSending}
                            className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg transition-colors ${(!selectedPatientId || !selectedFile || isSending)
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-blue-700'
                                }`}
                        >
                            {isSending ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Send Scan</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendScansPage
// Mock patient data - replace with actual data fetching
// const mockPatients = [
//     { id: 'user-001', name: 'John Doe', email: 'john.doe@example.com' },
//     { id: 'user-002', name: 'Jane Smith', email: 'jane.smith@example.com' },
//     { id: 'user-003', name: 'Robert Johnson', email: 'robert.j@example.com' },
//     { id: 'user-004', name: 'Emily Williams', email: 'emily.w@example.com' },
// ];
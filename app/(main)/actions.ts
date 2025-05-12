"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache"; // Import revalidatePath if you want to refresh data after insertion
import { redirect } from "next/navigation"; // Import redirect if you want to navigate after success

export const scheduleAppointment = async (formData: FormData) => {
    const name = formData.get("name")?.toString();       // Get name
    const email = formData.get("email")?.toString();
    const phone_number = formData.get("phone_number")?.toString();
    const appointment_date = formData.get("date")?.toString(); // Gets the value from hidden input
    const appointment_time = formData.get("time")?.toString();

    // Basic validation
    if (!name || !email || !appointment_date || !appointment_time) { // Added name validation
        console.error("Missing required appointment details.");
        // You might want to return an error state to the client here
        // instead of just logging on the server.
        // return { error: "Missing required appointment details." };
    }

    // Combine date and time if your Supabase column is a timestamp type
    // Adjust this based on your Supabase column type (date, timestamp, timestamptz)
    // Example: Creating an ISO 8601 string if needed (assuming UTC or handling timezone appropriately)
    // const appointmentDateTime = `${appointment_date}T${appointment_time}:00`; // Or use a library for robust parsing/formatting

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.error("User not authenticated.");
        // return { error: "User not authenticated." };
    }

    console.log({
        user_id: user!.id, // Associate with logged-in user
        name: name,              // Insert name
        email: email,            // Insert email (use the variable!)
        phone_number: phone_number, // Insert phone (ensure column exists/is named correctly)
        date: appointment_date,  // Insert date string (ensure column type matches - date or text)
        // time: appointment_time   // Insert time string (ensure column exists/is named correctly)
        // If using a combined timestamp:
        // appointment_datetime: appointmentDateTime // Ensure column exists/is named correctly (e.g., 'timestamp' type)
        created_at: new Date().toISOString(), // Add created_at timestamp for tracking
    },)


    const { data, error } = await supabase
        .from("appointments")
        .insert([
            {
                user_id: user!.id, // Associate with logged-in user
                name: name,              // Insert name
                email: email,            // Insert email (use the variable!)
                phone_number: phone_number, // Insert phone (ensure column exists/is named correctly)
                date: appointment_date,  // Insert date string (ensure column type matches - date or text)
                // time: appointment_time   // Insert time string (ensure column exists/is named correctly)
                // If using a combined timestamp:
                // appointment_datetime: appointmentDateTime // Ensure column exists/is named correctly (e.g., 'timestamp' type)
            },
        ])
        .select();

    if (error) {
        console.error("Supabase insert error:", error);
        // return { error: `Failed to schedule appointment: ${error.message}` };
    }

    console.log("Appointment scheduled successfully:", data);

    // Optional: Revalidate path if you display appointments elsewhere
    revalidatePath('/appointments'); // Example path

    // Optional: Redirect on success
    redirect('/appointments'); // Example success page

    // return { success: true, data }; // Can return data to the client if needed
};


export const deleteAppointment = async (id: number) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Supabase delete error:", error);
        return { error: `Failed to delete appointment: ${error.message}` };
    }

    console.log("Appointment deleted successfully:", data);

    // Optional: Revalidate path if you display appointments elsewhere
    revalidatePath('/appointments'); // Example path

    return { success: true, data }; // Can return data to the client if needed
}











export const createTicket = async (formData: FormData) => {

    const subject = formData.get("subject")?.toString();       // Get name
    const description = formData.get("description")?.toString();
    console.log(" triggered", subject, description)
    // Basic validation
    if (!subject || !description) { // Added name validation
        console.error("Missing required appointment details.");

    }



    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.error("User not authenticated.");
        // return { error: "User not authenticated." };
    }



    // ... existing code ...
    const { data, error } = await supabase
        .from("tickets") // Assuming this is your tickets table
        .insert([
            {
                user_id: user!.id, // Associate with logged-in user
                subject: subject,
                // Potentially add other ticket fields like description if needed
            },
        ])
        .select("id") // Select the ID of the newly created ticket
        .single(); // Get the single inserted row




    if (error) {
        console.error("Error creating ticket:", error);
        // Handle the error appropriately, maybe throw it or return an error status
        console.log("Cleaning up ticket due to chat creation failure...", error.message) // Example error return
    }

    const newTicketId = data?.id; // Get the ID of the new ticket

    const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .insert([
            {
                message: description, // Or maybe a default message like "Ticket created"
                ticket_id: newTicketId,
                user_id: user!.id,
                admin: false,
                // Link to the newly created ticket
                // Add other necessary chat fields, like initial message content if applicable
            },
        ])
        .select();

    if (chatError) {
        console.error("Error creating initial chat entry:", chatError);
        // Handle the error, maybe clean up the ticket if chat creation fails
        // You might want to implement a transaction or compensation logic here
    }

    // Return success status or relevant data
    console.log({ success: true, ticketId: newTicketId, chatData: chatData })
    // ... existing code ...

    if (error) {
        console.error("Supabase insert error:", error);
        // return { error: `Failed to schedule appointment: ${error.message}` };
    }

    console.log("Appointment scheduled successfully:", data);

    // Optional: Revalidate path if you display appointments elsewhere
    revalidatePath(`/support`); // Example path


    // Optional: Redirect on success
    redirect(`/support`); // Example success page

    // return { success: true, data }; // Can return data to the client if needed
};



export async function addMessageToChats(formData: FormData) {
    const messaage = formData.get("message")?.toString();       // Get name
    const ticket_id = formData.get("ticket_id")?.toString();       // Get name
    let admin = false

    const supabase = await createClient();
    console.log(" triggered", messaage)
    // Basic validation
    if (!messaage) { // Added name validation
        console.error("Missing required appointment details.");

    }

    if (!ticket_id) { // Added name validation
        console.error("Missing required appointment details.");

    }
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .insert([
            {
                message: messaage, // Or maybe a default message like "Ticket created"
                ticket_id: ticket_id,
                user_id: user!.id,
                admin: false,

            },
        ])

    revalidatePath(`/ticket/${ticket_id}`); // Example path

}
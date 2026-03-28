import supabase from "../config/supabase.js";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const filePath = path.resolve("ngo.csv");

async function upload() {
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
            results.push({
                name: data.name,
                description: data.description,
            });
        })
        .on("end", async () => {
            console.log("CSV loaded:", results.length, "records");

            try {
                const { error } = await supabase
                    .from("charities")
                    .insert(results);

                if (error) {
                    console.error("Insert error:", error.message);
                } else {
                    console.log("Successfully inserted all records");
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        });
}

upload();
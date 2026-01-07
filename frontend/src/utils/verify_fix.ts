import { combineDateTimeToUTC, TIMEZONES } from "./datetime";

console.log("--- Verifying Timezone Logic ---");

// Test 1: TIMEZONES list
console.log(`Total Timezones available: ${TIMEZONES.length}`);
if (TIMEZONES.length > 50) {
  console.log("✅ Timezone list is dynamic and populated.");
} else {
  console.error("❌ Timezone list seems too short.");
}

const first = TIMEZONES[0];
if (first.value && first.label && first.offset) {
  console.log(
    "✅ Timezone objects have correct structure (value, label, offset)."
  );
} else {
  console.error("❌ Timezone objects missing properties:", first);
}

// Test 2: Date Conversion (New York)
// EST (Winter) is UTC-5
const winterDate = "2024-01-01";
const winterTime = "10:00";
// 10:00 EST -> 15:00 UTC
const winterResult = combineDateTimeToUTC(
  winterDate,
  winterTime,
  "America/New_York"
);
console.log(
  `\nTest Winter (EST): ${winterDate} ${winterTime} NY -> ${winterResult}`
);
if (winterResult === "2024-01-01T15:00:00.000Z") {
  console.log("✅ Winter conversion correct.");
} else {
  console.error(
    `❌ Winter conversion FAILED. Expected 15:00Z, got ${winterResult}`
  );
}

// EDT (Summer) is UTC-4
const summerDate = "2024-06-01";
const summerTime = "10:00";
// 10:00 EDT -> 14:00 UTC
const summerResult = combineDateTimeToUTC(
  summerDate,
  summerTime,
  "America/New_York"
);
console.log(
  `Test Summer (EDT): ${summerDate} ${summerTime} NY -> ${summerResult}`
);
if (summerResult === "2024-06-01T14:00:00.000Z") {
  console.log("✅ Summer conversion correct.");
} else {
  console.error(
    `❌ Summer conversion FAILED. Expected 14:00Z, got ${summerResult}`
  );
}

// Test 3: Tokyo (No DST)
// JST is UTC+9 always
const tokyoDate = "2024-06-01";
const tokyoTime = "10:00";
// 10:00 JST -> 01:00 UTC (same day)
const tokyoResult = combineDateTimeToUTC(tokyoDate, tokyoTime, "Asia/Tokyo");
console.log(`\nTest Tokyo (JST): ${tokyoDate} ${tokyoTime} -> ${tokyoResult}`);
if (tokyoResult === "2024-06-01T01:00:00.000Z") {
  console.log("✅ Tokyo conversion correct.");
} else {
  console.error(
    `❌ Tokyo conversion FAILED. Expected 01:00Z, got ${tokyoResult}`
  );
}

console.log("\n--- Verification Complete ---");

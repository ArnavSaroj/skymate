# ✈️ Flight Price Tracker - Database Plan (Supabase)

This document outlines the full database architecture and long-term data handling strategy for the **Flight Price Tracking Project** using **Supabase**.

---

## 📁 Main Tables (in one Supabase database)

### 1. `airports_iata` (Already Exists)

Stores airport metadata:

* `iata_code` (e.g., BOM, DEL)
* `airport_name`
* `city`
* `country`

> Prevents repeating full airport info in other tables.

---

### 2. `routes`

Stores unique origin → destination combinations:

* `origin_iata_code` (FK to `airports_iata.iata_code`)
* `destination_iata_code` (FK to `airports_iata.iata_code`)
* `id` (UUID)

> Avoids storing same origin/destination again and again.

---

### 3. `airlines`

Stores unique airline names:

* `id` (UUID)
* `name` (e.g., IndiGo, Akasa, Vistara)

> One row per airline to prevent repetition.

---

### 4. `flight_prices`(main table)

Stores the actual scraped price data:

* `route_id` (FK to `routes.id`)
* `airline_id` (FK to `airlines.id`)
* `departure_date`
* `price`
* `source_site` (e.g., MakeMyTrip)
* `scraped_at` (auto timestamp)

> **UNIQUE constraint** on (`route_id`, `airline_id`, `departure_date`, `price`, `source_site`) prevents duplicate entries.

---

## 🔧 Stored Procedures

Stored procedures will be used to:

* Insert new prices
* Auto-create routes and airlines if not existing
* Prevent inserting duplicate prices
* Centralize logic inside the database for cleaner backend code

---

## 🗓️ Future Considerations (For Later Implementation)

### 1. Avoid Storing Far-Future Data

* Will **not store data for flights >3 months ahead**
* Instead, use **live scraper/API call** to fetch current prices on-demand

### 2. Archive Old Data

* Move past or outdated flight prices to another table or external archive (CSV, S3, etc.)
* Keeps the `flight_prices` table small and performant

---

## ✅ Summary

This schema design:

* Is modular and storage-efficient
* Enables fast queries and lookups
* Avoids duplicate or redundant data
* Scales well for free-tier and production use

---

> Built with long-term growth, speed, and Supabase limitations in mind.


RESULT 
all this is done
i will now create the stored procedures
names of stored procedures will be below:

insert_flight_price
here is its creationg
create or replace function insert_flight_price(
  _origin text,
  _destination text,
  _airline text,
  _departure_date date,
  _price numeric,
  _source_site text
)
returns text
language plpgsql
as $$
declare
  r_id uuid;
  a_id uuid;
begin
  -- Insert or get airline
  insert into airlines (name)
  values (_airline)
  on conflict (name) do update
  set name = excluded.name
  returning id into a_id;

  -- Insert or get route
  insert into routes (origin_iata_code, destination_iata_code)
  values (_origin, _destination)
  on conflict (origin_iata_code, destination_iata_code) do update
  set origin_iata_code = excluded.origin_iata_code
  returning id into r_id;

  -- Insert price (ignore duplicates)
  insert into flight_prices (route_id, airline_id, departure_date, price, source_site)
  values (r_id, a_id, _departure_date, _price, _source_site)
  on conflict do nothing;

  return 'inserted_or_skipped';
end;
$$;

# Quick Setup Guide - AVEtime Backend

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Redis (optional, for WebSocket scaling)

## Step-by-Step Setup

### 1. Clone and Install

```bash
cd avetime-backend
npm install
```

### 2. Environment Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=avetime
DB_SYNC=true

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars

# Redis
REDIS_URL=redis://localhost:6379

# Server
PORT=3000
NODE_ENV=development
```

### 3. Create Database

```bash
# Option 1: Using psql
psql -U postgres
CREATE DATABASE avetime;
\q

# Option 2: Using pgAdmin or any PostgreSQL client
```

### 4. Seed Initial Data

```bash
npm run seed
```

This creates:
- ✅ 20 Countries (US, UK, Canada, Australia, European countries, etc.)
- ✅ 400+ Major cities across all countries
- ✅ 3 Roles (Owner, Manager, Employee) with permissions

### 5. Start Development Server

```bash
npm run start:dev
```

Server runs on: `http://localhost:3000`

## What's Been Created

### Database Tables

- **t_users** - User accounts
- **t_countries** - Country data with ISO codes
- **t_cities** - City data linked to countries
- **t_roles** - Role definitions (Owner, Manager, Employee)
- **t_businesses** - Salon/business profiles
- **t_employees** - Employee profiles with role assignment
- **t_services** - Service offerings (haircut, coloring, manicure, etc.)
- **t_employee_services** - Service assignments to employees
- **t_appointments** - Booking records
- **t_opening_hours** - Business operating hours
- **t_employee_schedules** - Employee weekly schedules
- **t_employee_breaks** - Employee break times

### Pre-seeded Data

#### Countries (20)
- United States, Canada
- United Kingdom, Ireland
- Germany, France, Italy, Spain
- Netherlands, Belgium, Switzerland, Austria
- Scandinavian countries (Sweden, Norway, Denmark, Finland)
- Poland, Portugal, Greece
- Albania

#### Major Cities (400+)
- US: New York, Los Angeles, Chicago, Houston, Miami, San Francisco, Seattle, etc.
- UK: London, Birmingham, Manchester, Edinburgh, Glasgow, etc.
- Canada: Toronto, Montreal, Vancouver, Calgary, Ottawa, etc.
- Australia: Sydney, Melbourne, Brisbane, Perth, Adelaide, etc.
- And many more across all countries...

#### Roles with Permissions

**Owner Role**
```json
{
  "canManageBusiness": true,
  "canManageEmployees": true,
  "canManageServices": true,
  "canManageAppointments": true,
  "canViewReports": true,
  "canManageSettings": true
}
```

**Manager Role**
```json
{
  "canManageBusiness": false,
  "canManageEmployees": true,
  "canManageServices": true,
  "canManageAppointments": true,
  "canViewReports": true,
  "canManageSettings": false
}
```

**Employee Role**
```json
{
  "canManageBusiness": false,
  "canManageEmployees": false,
  "canManageServices": false,
  "canManageAppointments": true,
  "canViewReports": false,
  "canManageSettings": false
}
```

## Service Categories Available

When creating services for salons:

- `haircut` - Haircut services
- `coloring` - Hair coloring/dyeing
- `styling` - Hair styling
- `manicure` - Manicure services
- `pedicure` - Pedicure services
- `facial` - Facial treatments
- `massage` - Massage services
- `makeup` - Makeup application
- `waxing` - Waxing services
- `other` - Other services

## Appointment Statuses

- `pending` - Appointment requested
- `confirmed` - Appointment confirmed
- `in_progress` - Service in progress
- `completed` - Service completed
- `cancelled` - Appointment cancelled
- `no_show` - Customer didn't show up

## Day of Week Enumeration

For schedules and opening hours:
- 0 = Monday
- 1 = Tuesday
- 2 = Wednesday
- 3 = Thursday
- 4 = Friday
- 5 = Saturday
- 6 = Sunday

## Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Or on Windows, check Services
```

### Seeding Fails

```bash
# Drop and recreate database
psql -U postgres
DROP DATABASE avetime;
CREATE DATABASE avetime;
\q

# Run seed again
npm run seed
```

### TypeORM Sync Issues

If entities aren't syncing:
1. Set `DB_SYNC=true` in `.env`
2. Restart the server
3. For production, use migrations instead

## Next Steps

Now that your backend is set up:

1. ✅ Test the API endpoints
2. ✅ Create your first business (salon)
3. ✅ Add employees to the business
4. ✅ Create services for the salon
5. ✅ Set opening hours
6. ✅ Configure employee schedules
7. ✅ Start accepting appointments!

## Testing the API

You can use tools like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)
- curl

Example API call:

```bash
# Get all countries
curl http://localhost:3000/countries

# Get cities by country
curl http://localhost:3000/cities?countryId=<country-id>
```

## Need Help?

Check the main [README.md](README.md) for more detailed information about:
- API endpoints
- Authentication
- Role permissions
- Database schema
- Deployment guidelines

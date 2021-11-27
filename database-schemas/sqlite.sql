CREATE TABLE domains (
  domain_id INTEGER PRIMARY KEY,
  domain TEXT NOT NULL,
  description TEXT,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  active INTEGER NOT NULL,
);

CREATE TABLE destinations (
  destination_id INTEGER PRIMARY KEY,
  destination TEXT NOT NULL,
  active INTEGER NOT NULL,
);

CREATE TABLE aliases (
  alias_id INTEGER PRIMARY KEY,
  uuid TEXT NOT NULL,
  alias_address TEXT NOT NULL,
  domain_id INTEGER NOT NULL,
  FOREIGN KEY(domain_id) REFERENCES domains(domainId) ON DELETE RESTRICT,
  destination_id INTEGER NOT NULL,
  FOREIGN KEY(destination_id) REFERENCES destinations(destination_id) ON DELETE RESTRICT,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  ignore INTEGER NOT NULL DEFAULT 0,
  count INTEGER NOT NULL DEFAULT 0,
);
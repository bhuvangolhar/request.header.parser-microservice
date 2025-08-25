import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { headerParseResponseSchema, type HeaderParseResponse } from "@shared/schema";

// Helper function to parse Accept-Language header
function parseAcceptLanguage(acceptLanguage: string | undefined) {
  if (!acceptLanguage) return [];
  
  return acceptLanguage
    .split(',')
    .map(lang => {
      const parts = lang.trim().split(';');
      const code = parts[0].trim();
      const qualityMatch = parts[1]?.match(/q=([0-9.]+)/);
      const quality = qualityMatch ? parseFloat(qualityMatch[1]) : 1.0;
      return { code, quality };
    })
    .sort((a, b) => b.quality - a.quality);
}

// Helper function to get client IP address
function getClientIP(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'] as string;
  const realIP = req.headers['x-real-ip'] as string;
  const cfConnectingIP = req.headers['cf-connecting-ip'] as string;
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         (req.connection as any).socket?.remoteAddress || 
         '127.0.0.1';
}

// Helper function to parse User-Agent
function parseUserAgent(userAgent: string | undefined) {
  if (!userAgent) {
    return {
      browser: { name: null, version: null, major: null },
      os: { name: null, version: null },
      device: { type: null, vendor: null, model: null }
    };
  }

  // Simple user agent parsing - in production you'd use ua-parser-js
  const browser = { name: null, version: null, major: null };
  const os = { name: null, version: null };
  const device = { type: null, vendor: null, model: null };

  // Browser detection
  if (userAgent.includes('Chrome')) {
    browser.name = 'Chrome';
    const match = userAgent.match(/Chrome\/([0-9.]+)/);
    if (match) {
      browser.version = match[1];
      browser.major = match[1].split('.')[0];
    }
  } else if (userAgent.includes('Firefox')) {
    browser.name = 'Firefox';
    const match = userAgent.match(/Firefox\/([0-9.]+)/);
    if (match) {
      browser.version = match[1];
      browser.major = match[1].split('.')[0];
    }
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser.name = 'Safari';
    const match = userAgent.match(/Version\/([0-9.]+)/);
    if (match) {
      browser.version = match[1];
      browser.major = match[1].split('.')[0];
    }
  } else if (userAgent.includes('Edge')) {
    browser.name = 'Edge';
    const match = userAgent.match(/Edge\/([0-9.]+)/);
    if (match) {
      browser.version = match[1];
      browser.major = match[1].split('.')[0];
    }
  }

  // OS detection
  if (userAgent.includes('Windows NT')) {
    os.name = 'Windows';
    const match = userAgent.match(/Windows NT ([0-9.]+)/);
    if (match) {
      const version = match[1];
      switch (version) {
        case '10.0': os.version = '10'; break;
        case '6.3': os.version = '8.1'; break;
        case '6.2': os.version = '8'; break;
        case '6.1': os.version = '7'; break;
        default: os.version = version;
      }
    }
  } else if (userAgent.includes('Mac OS X')) {
    os.name = 'macOS';
    const match = userAgent.match(/Mac OS X ([0-9_.]+)/);
    if (match) {
      os.version = match[1].replace(/_/g, '.');
    }
  } else if (userAgent.includes('Linux')) {
    os.name = 'Linux';
  } else if (userAgent.includes('Android')) {
    os.name = 'Android';
    const match = userAgent.match(/Android ([0-9.]+)/);
    if (match) {
      os.version = match[1];
    }
  } else if (userAgent.includes('iOS')) {
    os.name = 'iOS';
    const match = userAgent.match(/OS ([0-9_]+)/);
    if (match) {
      os.version = match[1].replace(/_/g, '.');
    }
  }

  // Device type detection
  if (userAgent.includes('Mobile') || userAgent.includes('Android')) {
    device.type = 'mobile';
  } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
    device.type = 'tablet';
  } else {
    device.type = 'desktop';
  }

  return { browser, os, device };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Header parser API endpoint
  app.get('/api/whoami', (req: Request, res: Response) => {
    try {
      const ipaddress = getClientIP(req);
      const userAgent = req.headers['user-agent'];
      const acceptLanguage = req.headers['accept-language'] as string | undefined;
      
      const languages = parseAcceptLanguage(acceptLanguage);
      const { browser, os, device } = parseUserAgent(userAgent);
      
      const response: HeaderParseResponse = {
        ipaddress,
        language: acceptLanguage || null,
        software: userAgent || null,
        parsed: {
          browser,
          os,
          device,
          languages
        },
        timestamp: new Date().toISOString()
      };

      // Validate response with schema
      const validatedResponse = headerParseResponseSchema.parse(response);
      
      res.json(validatedResponse);
    } catch (error) {
      console.error('Error parsing headers:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to parse request headers' 
      });
    }
  });

  // CORS support
  app.use('/api/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, User-Agent, Accept-Language, X-Forwarded-For, X-Real-IP');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

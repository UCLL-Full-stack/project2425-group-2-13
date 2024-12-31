import { Tour as TourPrisma } from '@prisma/client';
import {Tourist} from '../model/tourist'

export class Tour {
  private id?: number;
  private name: string;
  private description: string;
  private distance: number;
  private duration: number;
  private level: string;
  private guide_email: string;
  private participants: Tourist[];
  private number_of_participants: number;
  private day: Date;

  constructor({
    id,
    name,
    description,
    distance,
    duration,
    level,
    guide_email,
    number_of_participants = 0,
    day,
  }: {
    id?: number;
    name: string;
    description: string;
    distance: number;
    duration: number;
    level: string;
    guide_email: string;
    number_of_participants?: number;
    day: Date;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.distance = distance;
    this.duration = duration;
    this.level = level;
    this.guide_email = guide_email;
    this.participants = [];
    this.number_of_participants = number_of_participants;
    this.day = day;
  }

  static from({
    id,
    name,
    description,
    distance,
    duration,
    level,
    guide_email,
    participants = [],  // Default to an empty array if not provided
    number_of_participants = 0,  // Default to 0 if not provided
    day,
  }: {
    id: number;
    name: string;
    description: string;
    distance: number;
    duration: number;
    level: string;
    guide_email: string;
    participants?: Tourist[];  // Optional participants field
    number_of_participants?: number;  // Optional number of participants field
    day: Date;
  }): Tour {
    return new Tour({
      id,
      name,
      description,
      distance,
      duration,
      level,
      guide_email,
      number_of_participants,
      day,
    });
  }
  
  

  // Getters
  getID(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getDistance(): number {
    return this.distance;
  }

  getDuration(): number {
    return this.duration;
  }

  getLevel(): string {
    return this.level;
  }

  getGuideEmail(): string {
    return this.guide_email;
  }

  getParticipants(): Tourist[] {
    return this.participants;
  }

  getNumberOfParticipants(): number {
    return this.number_of_participants;
  }

  getDay(): Date {
    return this.day;
  }

  // Setters
  setID(id: number): void {
    this.id = id;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setDistance(distance: number): void {
    this.distance = distance;
  }

  setDuration(duration: number): void {
    this.duration = duration;
  }

  setLevel(level: string): void {
    this.level = level;
  }

  setGuideEmail(guide_email: string): void {
    this.guide_email = guide_email;
  }

  setParticipants(participants: Tourist[]): void {
    this.participants = participants;
  }
  
  addParticipant(participant : Tourist) : void {
    this.participants.push(participant);
  }

  setNumberOfParticipants(number: number): void {
    if (number < 0) {
      throw new Error('Number of participants cannot be negative');
    }
    this.number_of_participants = number;
  }

  setDay(day: Date): void {
    this.day = day;

}
}

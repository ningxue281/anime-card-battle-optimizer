@@
 export interface Trait {
   id: string;
   name: string;
   icon: string;
   description: string;
   effects: string;
+  notes?: string;
   createdAt: number;
   updatedAt: number;
 }
@@
 export interface Support {
   id: string;
   name: string;
   artwork: string;
   description: string;
   effects: string;
+  notes?: string;
   createdAt: number;
   updatedAt: number;
 }

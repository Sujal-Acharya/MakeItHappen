export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            friendships: {
                Row: {
                    created_at: string | null
                    friend_id: string
                    id: string
                    status: string | null
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string | null
                    friend_id: string
                    id?: string
                    status?: string | null
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string | null
                    friend_id?: string
                    id?: string
                    status?: string | null
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "friendships_friend_id_fkey"
                        columns: ["friend_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "friendships_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            goals: {
                Row: {
                    category: string
                    created_at: string | null
                    current_value: number | null
                    description: string | null
                    id: string
                    progress: number | null
                    start_date: string | null
                    status: string | null
                    target_date: string | null
                    target_value: number | null
                    title: string
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    category: string
                    created_at?: string | null
                    current_value?: number | null
                    description?: string | null
                    id?: string
                    progress?: number | null
                    start_date?: string | null
                    status?: string | null
                    target_date?: string | null
                    target_value?: number | null
                    title: string
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    category?: string
                    created_at?: string | null
                    current_value?: number | null
                    description?: string | null
                    id?: string
                    progress?: number | null
                    start_date?: string | null
                    status?: string | null
                    target_date?: string | null
                    target_value?: number | null
                    title?: string
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "goals_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            group_goals: {
                Row: {
                    goal_id: string
                    group_id: string
                    id: string
                    shared_at: string | null
                    shared_by: string
                }
                Insert: {
                    goal_id: string
                    group_id: string
                    id?: string
                    shared_at?: string | null
                    shared_by: string
                }
                Update: {
                    goal_id?: string
                    group_id?: string
                    id?: string
                    shared_at?: string | null
                    shared_by?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "group_goals_goal_id_fkey"
                        columns: ["goal_id"]
                        isOneToOne: false
                        referencedRelation: "goals"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "group_goals_group_id_fkey"
                        columns: ["group_id"]
                        isOneToOne: false
                        referencedRelation: "groups"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "group_goals_shared_by_fkey"
                        columns: ["shared_by"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            group_members: {
                Row: {
                    group_id: string
                    id: string
                    joined_at: string | null
                    role: string | null
                    user_id: string
                }
                Insert: {
                    group_id: string
                    id?: string
                    joined_at?: string | null
                    role?: string | null
                    user_id: string
                }
                Update: {
                    group_id?: string
                    id?: string
                    joined_at?: string | null
                    role?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "group_members_group_id_fkey"
                        columns: ["group_id"]
                        isOneToOne: false
                        referencedRelation: "groups"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "group_members_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            groups: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    created_by: string
                    description: string | null
                    id: string
                    name: string
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    created_by: string
                    description?: string | null
                    id?: string
                    name: string
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    created_by?: string
                    description?: string | null
                    id?: string
                    name?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "groups_created_by_fkey"
                        columns: ["created_by"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    id: string
                    name: string
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    id: string
                    name: string
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    id?: string
                    name?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            progress_logs: {
                Row: {
                    goal_id: string
                    id: string
                    logged_at: string | null
                    note: string | null
                    user_id: string
                    value: number
                }
                Insert: {
                    goal_id: string
                    id?: string
                    logged_at?: string | null
                    note?: string | null
                    user_id: string
                    value: number
                }
                Update: {
                    goal_id?: string
                    id?: string
                    logged_at?: string | null
                    note?: string | null
                    user_id?: string
                    value?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "progress_logs_goal_id_fkey"
                        columns: ["goal_id"]
                        isOneToOne: false
                        referencedRelation: "goals"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "progress_logs_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            tasks: {
                Row: {
                    completed: boolean | null
                    completed_at: string | null
                    created_at: string | null
                    description: string | null
                    due_date: string | null
                    goal_id: string
                    id: string
                    priority: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    completed?: boolean | null
                    completed_at?: string | null
                    created_at?: string | null
                    description?: string | null
                    due_date?: string | null
                    goal_id: string
                    id?: string
                    priority?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    completed?: boolean | null
                    completed_at?: string | null
                    created_at?: string | null
                    description?: string | null
                    due_date?: string | null
                    goal_id?: string
                    id?: string
                    priority?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "tasks_goal_id_fkey"
                        columns: ["goal_id"]
                        isOneToOne: false
                        referencedRelation: "goals"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

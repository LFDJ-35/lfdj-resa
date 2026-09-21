import { Member } from '@/models/member'
import { ref } from 'vue'

export const identity = ref<Member | null>(null)

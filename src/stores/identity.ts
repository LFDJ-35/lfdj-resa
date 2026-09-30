import { Member } from '@/models/member'
import { ref } from 'vue'

export const identity = ref<Member | null>(null)

export function memberIsIdentity(member: Member | null | undefined): boolean {
  return (identity.value !== null
    && member !== null
    && member !== undefined
    && identity.value.id === member.id)
}

import { Member } from '@/models/member'
import { computed, ref } from 'vue'

export const identity = ref<Member | null>(null)
export const identified = computed(() => identity.value != null)

export function memberIsIdentity(member: Member | null | undefined): boolean {
  const identityValue = identity.value
  return (
    identityValue !== null &&
    member !== null &&
    member !== undefined &&
    identityValue.id === member.id
  )
}

import { reactive, type UnwrapNestedRefs } from 'vue'

type EventHandler = (...args: any[]) => void

interface EventBus {
  [key: string]: EventHandler[]
}

const eventBus: UnwrapNestedRefs<Map<string, EventHandler[]>> = reactive(
  new Map<string, EventHandler[]>(),
)

export function useEventBus() {
  function $emit(event: string, ...args: any[]): void {
    const handlers = eventBus.get(event)
    if (handlers) {
      handlers.forEach((handler) => handler(...args))
    }
  }

  function $on(event: string, handler: EventHandler): void {
    const handlers = eventBus.get(event) || []
    eventBus.set(event, [...handlers, handler])
  }

  function $off(event: string, handler: EventHandler): void {
    const handlers = eventBus.get(event)
    if (handlers) {
      eventBus.set(
        event,
        handlers.filter((h) => h !== handler),
      )
    }
  }

  return { $emit, $on, $off }
}

<script setup>
import { useContactStore } from '~/stores/contact'

const contactStore = useContactStore()
const router = useRouter()

const status = ref('')
const email = ref('')
const username = ref('')
const subject = ref('')
const message = ref('')

const isLoading = computed(() => contactStore.isLoading)

const contactFormRef = ref(null)

onMounted(() => {
  if (router.currentRoute.value.query.contact) {
    setTimeout(() => {
      window.scrollTo({
        top: contactFormRef.value.offsetTop - 250,
        behavior: 'smooth',
      })
    }, 1000)
  }
})

const checkForm = async (e) => {
  e.preventDefault()
  if (
    isLoading.value ||
    !username.value ||
    !email.value ||
    !subject.value ||
    !message.value
  ) {
    status.value = 'fail'
    return
  }

  try {
    const payload = {
      attributes: {
        title: subject.value,
        field_email: email.value,
        field_name: username.value,
        field_message: message.value,
      },
    }
    await contactStore.post(payload)
    status.value = 'sent'
  } catch (err) {
    status.value = 'fail'
  }
}
</script>

<template>
  <div class="contact-form">
    <form id="contact" ref="contactForm" method="post" @submit="checkForm">
      <div v-if="status === 'sent'" class="alert alert--success" role="alert">
        {{ $t('pages.contact.sent') }}
      </div>
      <div v-else>
        <TextField
          id="username"
          v-model.trim="username"
          :label="$t('pages.contact.form.name')"
          type="text"
          color="dark"
          required
        >
          <Icon name="user" stroke="#000" :scale="48">
            <User />
          </Icon>
        </TextField>

        <TextField
          id="email"
          v-model.trim="email"
          :label="$t('pages.contact.form.email')"
          type="email"
          color="dark"
          required
        >
          <Icon name="mail" stroke="#000" :scale="48">
            <Mail />
          </Icon>
        </TextField>

        <TextField
          id="subject"
          v-model.trim="subject"
          :label="$t('pages.contact.form.subject')"
          type="text"
          color="dark"
          required
        >
          <Icon name="subject" stroke="#000" :scale="48">
            <Subject />
          </Icon>
        </TextField>

        <TextAreaField
          id="message"
          v-model="message"
          :label="$t('pages.contact.form.message')"
          color="dark"
          required
        >
          <Icon name="message" stroke="#000" :scale="48">
            <Message />
          </Icon>
        </TextAreaField>

        <Button :loading="isLoading" type="light" :label="$t('submit')" />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 50%;

    @media (max-width: $breakpoint-sm) {
      width: 100%;
    }
  }
}

.button {
  margin: auto;
  display: block;
}
</style>

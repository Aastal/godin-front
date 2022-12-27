<template>
  <div class="contact-form">
    <form id="contact" ref="contactForm" method="post" @submit="checkForm">
      <div v-if="status === 'sent'" class="alert alert--success" role="alert">
        {{ $t('pages.contact.sent') }}
      </div>
      <div v-else>
        <text-field
          id="username"
          v-model.trim="username"
          :label="$t('pages.contact.form.name')"
          type="text"
          color="dark"
          required
        >
          <icon name="user" stroke="#000" :scale="48">
            <user />
          </icon>
        </text-field>

        <text-field
          id="email"
          v-model.trim="email"
          :label="$t('pages.contact.form.email')"
          type="email"
          color="dark"
          required
        >
          <icon name="mail" stroke="#000" :scale="48">
            <mail />
          </icon>
        </text-field>

        <text-field
          id="subject"
          v-model.trim="subject"
          :label="$t('pages.contact.form.subject')"
          type="text"
          color="dark"
          required
        >
          <icon name="subject" stroke="#000" :scale="48">
            <subject />
          </icon>
        </text-field>

        <text-area-field
          id="message"
          v-model="message"
          :label="$t('pages.contact.form.message')"
          color="dark"
          required
        >
          <icon name="message" stroke="#000" :scale="48">
            <message />
          </icon>
        </text-area-field>

        <Button :loading="isLoading" type="light" :label="$t('submit')" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ContactForm',
  components: {
    TextField: () => import('./fields/TextField'),
    TextAreaField: () => import('./fields/TextAreaField'),
    Icon: () => import('./icon/Icon'),
    User: () => import('./icon/icons/User'),
    Mail: () => import('./icon/icons/Mail'),
    Subject: () => import('./icon/icons/Subject'),
    Message: () => import('./icon/icons/Message'),
  },
  data() {
    return {
      status: '',
      errors: [],
      email: '',
      username: '',
      subject: '',
      message: '',
    }
  },
  computed: {
    ...mapGetters('contact', {
      isLoading: 'isLoading',
    }),
  },
  mounted() {
    if (process.browser && this.$route.query.contact) {
      const contact = this.$refs.contactForm
      setTimeout(function () {
        window.scrollTo({
          top: contact.offsetTop - 250,
          behavior: 'smooth',
        })
      }, 1000)
    }
  },
  methods: {
    ...mapActions('contact', {
      create: 'create',
    }),
    async checkForm(e) {
      e.preventDefault()
      if (
        this.isLoading ||
        this.username === '' ||
        this.email === '' ||
        this.subject === '' ||
        this.message === ''
      ) {
        this.status = 'fail'
        return
      }

      try {
        await this.create({
          attributes: {
            title: this.subject,
            field_email: this.email,
            field_name: this.username,
            field_message: this.message,
          },
        })
        this.status = 'sent'
      } catch (err) {
        this.status = 'fail'
      }
    },
  },
}
</script>

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

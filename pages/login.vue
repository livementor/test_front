<template>
  <div class="p-2 md:p-10 text-center items-center content-center">
    <h1 class="heading text-2xl mb-1">
      {{ $t("login.welcome") }}
    </h1>
    <p class="text-xl mb-4">
      {{ getSubtitle }}
    </p>
    <div
      v-if="shouldLogin || shouldRegister"
      class="w-64 max-w-full m-auto text-left"
    >
      <BaseInput
        id="email"
        v-model="email"
        :error="errors.includes('email')"
        type="email"
        :label="$t('login.emailPlaceholder')"
        @blur="validateField"
      />
      <BaseInput
        id="password"
        v-model="password"
        classes="pr-10"
        :error="errors.includes('password')"
        :type="passwordShow ? 'password' : 'text'"
        :label="$t('login.passwordPlaceholder')"
        @blur="validateField"
      >
        <BaseIcon
          :name="passwordShow ? 'eye' : 'eye-off'"
          class="
            mr-2
            absolute
            top-1/2
            transform
            -translate-y-1/2
            right-0
            w-6
            h-6
            cursor-pointer
          "
          @click.native="passwordShow = !passwordShow"
        />
      </BaseInput>
      <Button class="w-full mt-2" @click.native="buttonClicked()">
        {{ shouldLogin ? $t("login.loginButton") : $t("login.registerButton") }}
      </Button>
    </div>
    <div class="w-64 m-auto max-w-full">
      <Button
        v-if="!shouldLogin"
        class="w-full mt-2"
        @click.native="
          shouldRegister = false;
          shouldLogin = true;
        "
      >
        {{ $t("login.loginButton") }}
      </Button>
      <Button
        v-if="!shouldRegister"
        class="w-full mt-2"
        @click.native="
          shouldRegister = true;
          shouldLogin = false;
        "
      >
        {{ $t("login.registerButton") }}
      </Button>
    </div>
  </div>
</template>

<script>
import { NotificationType } from "@/models/notification";

export default {
  data: () => {
    return {
      email: "",
      displayName: "",
      password: "",
      passwordShow: true,
      shouldLogin: false,
      shouldRegister: false,
      errors: [],
    };
  },
  head() {
    return {
      title: "Connexion - Livementor",
    };
  },
  computed: {
    getSubtitle() {
      if (!this.shouldLogin && !this.shouldRegister) {
        return this.$t("login.default");
      }
      return this.shouldLogin
        ? this.$t("login.login")
        : this.$t("login.register");
    },
  },
  methods: {
    validateField(event) {
      const type = event.target.type;

      /* @TODO: Vuelidate */
      if (type === "email") {
        if (this.email === "") {
          if (!this.errors.includes("email")) {
            this.errors.push("email");
          }
        } else {
          this.errors = this.errors.filter((error) => error !== "email");
        }
      } else if (type === "password" || type === "text") {
        if (this.password === "") {
          if (!this.errors.includes("password")) {
            this.errors.push("password");
          }
        } else {
          this.errors = this.errors.filter((error) => error !== "password");
        }
      }
    },
    buttonClicked() {
      if (this.shouldRegister) {
        this.$fire.auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            if (response.user) {
              this.$store.dispatch("setAuthUser", response.user.uid);
              this.$router.replace("/chat");
            }
          })
          .catch((e) => {
            this.$store.dispatch("showNotification", {
              message: e.message,
              type: NotificationType.ERROR,
            });
          });
      } else {
        /* @TODO: Vuelidate */
        this.$fire.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            if (response.user) {
              this.$store.dispatch("setAuthUser", response.user.uid);
              this.$router.replace("/chat");
            }
          })
          .catch((e) => {
            this.$store.dispatch("showNotification", {
              message: e.message,
              type: NotificationType.ERROR,
            });
          });
      }
    },
  },
};
</script>

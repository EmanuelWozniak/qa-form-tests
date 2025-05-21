# Scenariusze testowe – formularz rejestracyjny

Formularz testowany lokalnie na `http://localhost:8081`

---

##  Scenariusz 1: Poprawna rejestracja

**Cel:** Użytkownik poprawnie uzupełnia formularz.  
**Kroki:**
1. Imię: `Emanuel`
2. Nazwisko: `Woźniak`
3. E-mail: `wozniak.emanuel@tests.com`
4. Hasło: `Test12345!` i powtórzenie
5. Data urodzenia: `2000-02-13`
6. Język: `polski`
7. Telefon: `501123456`
8. Zgoda regulaminu: `Zaznacz checkbox`
9. Kliknięcie: `ZAREJESTRUJ`

**Oczekiwany rezultat:** Rejestracja zakończona / komunikat sukcesu

---

##  Scenariusz 2: Puste wymagane pola

**Cel:** Walidacja pustych pól.  
**Kroki:** Kliknij `ZAREJESTRUJ` bez wypełniania danych

**Oczekiwany rezultat:** Komunikaty błędów przy każdym wymaganym polu

---

## Scenariusz 3: Niepoprawny adres e-mail

**Cel:** Sprawdzenie walidacji formatu e-mail  
**Kroki:** Wpisz `ABCD` w pole e-mail (reszta poprawna)

**Oczekiwany rezultat:** Komunikat: „Niepoprawny adres e-mail”

---

## Scenariusz 4: Hasła nie są zgodne

**Cel:** Sprawdzenie spójności pól hasła  
**Kroki:** Hasło: `Test12345!`, Powtórzone: `Test1234`

**Oczekiwany rezultat:** Komunikat: „Hasła nie są identyczne”

---

## Scenariusz 5: Brak akceptacji regulaminu

**Cel:** Wymuszenie akceptacji checkboxa  
**Kroki:** Wypełnij cały formularz, NIE zaznacz checkboxa `Akceptuję regulamin oraz politykę prywatności`

**Oczekiwany rezultat:** Formularz nie powinien zostać wysłany

---

Testy automatyczne znajdują się w pliku `form.spec.ts` i odpowiadają dokładnie powyższym scenariuszom.
